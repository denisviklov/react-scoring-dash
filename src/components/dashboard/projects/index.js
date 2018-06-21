import React from "react";
import { Row, Col, message } from "antd";
import { FormattedMessage, injectIntl } from "react-intl";
import { compose, withApollo, graphql } from "react-apollo";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { List } from "../../utils/list";
import { CodeForm } from "./code";
import { ALL_PROJECTS, PROJECT_WITH_PIXELS } from "./gql/query";
import {
  EDIT_PROJECT,
  CREATE_PROJECT,
  DELETE_PROJECT,
  EDIT_OFFER,
  CREATE_OFFER,
  DELETE_OFFER
} from "./gql/mutation";

import "./projects.css";

class ProjectsMainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      projectSelected: null,
      offers: [],
      offerSelected: null
    };
  }

  handleInternalError = err => {
    console.error(err);
    const { formatMessage } = this.props.intl;
    message.error(
      formatMessage({
        id: "general.network-error",
        defaultMessage: "Network error, try again later"
      })
    );
  };

  mutationRequest(mutation, options, thenCallback) {
    this.props
      [mutation](options)
      .then(({ data }) => {
        let mutationRes = data[mutation];
        let error = mutationRes.error || null;
        if (error) {
          return message.error(error);
        }
        thenCallback(mutationRes);
      })
      .catch(this.handleInternalError);
  }

  getProjectsRequest = cb => {
    this.props.client
      .query({ query: ALL_PROJECTS })
      .then(res => {
        cb(null, res.data.allProjects);
      })
      .catch(this.handleInternalError);
  };

  getOffersRequest = (project, cb) => {
    this.props.client
      .query({
        query: PROJECT_WITH_PIXELS,
        variables: { id: project.id }
      })
      .then(res => {
        cb(null, res.data.project.pixels);
      })
      .catch(this.handleInternalError);
  };

  loadProjects(cb) {
    this.getProjectsRequest((err, projects) => {
      cb(err, { projects: projects });
    });
  }

  loadDataAndChooseSelects(selected, cb) {
    let state = {};
    this.loadProjects((err, projectsState) => {
      if (err) {
        return cb(err, null);
      }
      state = Object.assign(state, projectsState);
      let projects = projectsState.projects;
      if (!projects.length) {
        state.projectSelected = null;
        return cb(null, state);
      }
      state.projectSelected = selected || projects[0];
      this.loadOffersAndChooseSelected(
        state.projectSelected,
        null,
        (err, offersState) => {
          if (err) {
            return cb(err, null);
          }
          state = Object.assign(state, offersState);
          return cb(null, state);
        }
      );
    });
  }

  componentWillMount() {
    this.loadDataAndChooseSelects(null, (error, state) => {
      if (error) {
        return message.error(error);
      }
      this.setState(state);
    });
  }

  onProjectSelect = project => {
    let state = { projectSelected: project };
    this.loadOffersAndChooseSelected(project, null, (error, offersState) => {
      if (error) {
        return message.error(error);
      }
      state = Object.assign(state, offersState);
      this.setState(state);
    });
  };

  onProjectEdit = project => {
    this.mutationRequest("editProject", { variables: project }, () => {
      this.loadProjects((error, state) => {
        if (error) {
          return message.error(error);
        }
        this.setState(state);
      });
    });
  };

  onProjectDelete = project => {
    this.mutationRequest("deleteProject", { variables: project }, () => {
      this.loadDataAndChooseSelects(null, (error, state) => {
        if (error) {
          return message.error(error);
        }
        this.setState(state);
      });
    });
  };

  onProjectAdd = project => {
    this.mutationRequest(
      "createProject",
      { variables: project },
      createProject => {
        let project = createProject.project || null;
        this.loadDataAndChooseSelects(project, (error, state) => {
          if (error) {
            return message.error(error);
          }
          this.setState(state);
        });
      }
    );
  };

  loadOffers = (project, cb) => {
    this.getOffersRequest(project, (err, pixels) => {
      if (err) {
        return cb(err, null);
      }
      cb(err, { offers: pixels });
    });
  };

  findSelectedPixel(pixels, selected) {
    for (let i = 0; i < pixels.length; i++) {
      if (pixels[i].id === selected.id) {
        return pixels[i];
      }
    }
    return null;
  }

  loadOffersAndChooseSelected = (project, selected, cb) => {
    let state = {};
    this.loadOffers(project, (err, offersState) => {
      if (err) {
        return cb(err, null);
      }
      state = Object.assign(state, offersState);

      let pixels = offersState.offers;
      state.offerSelected = null;
      if (pixels.length) {
        state.offerSelected = selected
          ? this.findSelectedPixel(pixels, selected)
          : pixels[0];
      }
      cb(null, state);
    });
  };

  onOfferSelect = pixel => {
    this.setState({ offerSelected: pixel });
  };

  onOfferEdit = offer => {
    let options = { variables: offer };
    this.mutationRequest("editPixel", options, editPixel => {
      this.loadOffersAndChooseSelected(
        this.state.projectSelected,
        editPixel.pixel,
        (err, state) => {
          this.setState(state);
        }
      );
    });
  };

  onOfferDelete = offer => {
    const projectId = this.state.projectSelected.id;
    let options = {
      variables: { ...offer, projectId },
      update: (proxy, { data: { deletePixel } }) => {
        const data = proxy.readQuery({
          query: PROJECT_WITH_PIXELS,
          variables: { id: projectId }
        });
        data.project.pixels = data.project.pixels.filter(pixel => {
          return pixel.id !== deletePixel.id;
        });
        proxy.writeQuery({
          query: PROJECT_WITH_PIXELS,
          variables: { id: projectId },
          data
        });
      }
    };
    this.mutationRequest("deletePixel", options, deletePixel => {
      this.loadOffersAndChooseSelected(
        this.state.projectSelected,
        null,
        (error, state) => {
          if (error) {
            return message.error(error);
          }
          this.setState(state);
        }
      );
    });
  };

  onOfferAdd = offer => {
    const projectId = this.state.projectSelected.id;
    let options = {
      variables: { ...offer, projectId },
      update: (proxy, { data: { createPixel } }) => {
        const data = proxy.readQuery({
          query: PROJECT_WITH_PIXELS,
          variables: { id: projectId }
        });
        data.project.pixels.push(createPixel.pixel);
        proxy.writeQuery({
          query: PROJECT_WITH_PIXELS,
          variables: { id: projectId },
          data
        });
      }
    };
    this.mutationRequest("createPixel", options, createPixel => {
      let pixel = createPixel.pixel || null;
      this.loadOffersAndChooseSelected(
        this.state.projectSelected,
        pixel,
        (error, state) => {
          if (error) {
            return message.error(error);
          }
          this.setState(state);
        }
      );
    });
  };

  onSaveClientDataChange = e => {
    let offer = Object.assign({}, this.state.offerSelected);
    offer.saveClientData = e.target.checked;
    this.onOfferEdit(offer);
  };

  render() {
    let allProjects = this.state.projects;
    let projectSelected = this.state.projectSelected;
    let offerSelected = this.state.offerSelected;
    const offers = this.state.offers;
    return (
      <div className="page projects">
        <BreadcrumbsItem
          to="/dashboard/projects"
          className="ant-breadcrumb-link"
        >
          <FormattedMessage id="main-menu.projects" defaultMessage="Projects" />
        </BreadcrumbsItem>
        <Row gutter={16} className="lists-row">
          <Col span={12} className="list-col">
            <List
              header={
                <FormattedMessage
                  id="main-menu.projects"
                  defaultMessage="Projects"
                />
              }
              selected={projectSelected}
              data={allProjects}
              onSelect={this.onProjectSelect}
              onEditItem={this.onProjectEdit}
              onDeleteItem={this.onProjectDelete}
              onAddItem={this.onProjectAdd}
            />
          </Col>
          <Col span={12} className="list-col">
            <List
              header={
                <FormattedMessage
                  id="projects.offers"
                  defaultMessage="Offers"
                />
              }
              data={offers}
              selected={offerSelected}
              onSelect={this.onOfferSelect}
              onEditItem={this.onOfferEdit}
              onDeleteItem={this.onOfferDelete}
              onAddItem={this.onOfferAdd}
            />
          </Col>
        </Row>
        {offerSelected && (
          <Row style={{ marginTop: "16px" }}>
            <CodeForm
              data={offerSelected}
              onSaveClientDataChange={this.onSaveClientDataChange}
            />
          </Row>
        )}
      </div>
    );
  }
}

export default compose(
  withApollo,
  graphql(EDIT_PROJECT, { name: "editProject" }),
  graphql(CREATE_PROJECT, {
    name: "createProject",
    options: {
      update: (proxy, { data: { createProject } }) => {
        const data = proxy.readQuery({ query: ALL_PROJECTS });
        data.allProjects.push(createProject.project);
        proxy.writeQuery({ query: ALL_PROJECTS, data });
      }
    }
  }),
  graphql(DELETE_PROJECT, {
    name: "deleteProject",
    options: {
      update: (proxy, { data: { deleteProject } }) => {
        const data = proxy.readQuery({ query: ALL_PROJECTS });
        data.allProjects = data.allProjects.filter(project => {
          return project.id !== deleteProject.id;
        });
        proxy.writeQuery({ query: ALL_PROJECTS, data });
      }
    }
  }),
  graphql(EDIT_OFFER, { name: "editPixel" }),
  graphql(CREATE_OFFER, { name: "createPixel" }),
  graphql(DELETE_OFFER, { name: "deletePixel" })
)(injectIntl(ProjectsMainComponent));
