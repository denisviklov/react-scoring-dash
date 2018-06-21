import { gql } from "react-apollo";

export const LEAD_AGE_GROUPS = gql`
  {
    leadAgeGroups {
      groupName
      groupTitle
    }
  }
`;

export const LEAD_DURATION_GROUPS = gql`
  {
    leadDurationGroups {
      groupName
      groupTitle
    }
  }
`;

export const leadGroupsQuery = metric => {
  switch (metric) {
    case "lead-age":
      return LEAD_AGE_GROUPS;
    case "lead-duration":
      return LEAD_DURATION_GROUPS;
    default:
      return null;
  }
};
export const leadGroupsVar = metric => {
  switch (metric) {
    case "lead-age":
      return "leadAgeGroups";
    case "lead-duration":
      return "leadDurationGroups";
    default:
      return null;
  }
};

export const LEADS_BY_PERIOD_QUERY = gql`
  query leadsByPeriod(
    $dateFrom: DateTime!
    $dateTo: DateTime!
    $projects: [UUID]
  ) {
    data: leadsByPeriod(
      dateFrom: $dateFrom
      dateTo: $dateTo
      projects: $projects
    ) {
      created
      leadsCount
    }
  }
`;

export const LEAD_DURATION_BY_PERIOD_QUERY = gql`
  query leadDurationByPeriod(
    $dateFrom: DateTime!
    $dateTo: DateTime!
    $groups: [String]
    $projects: [UUID]
  ) {
    data: leadDurationByPeriod(
      dateFrom: $dateFrom
      dateTo: $dateTo
      groups: $groups
      projects: $projects
    ) {
      created
      groupName
      groupTitle
      leadsCount
    }
  }
`;

export const LEAD_AGE_TOTALS_QUERY = gql`
  query leadAgeTotals(
    $dateFrom: DateTime!
    $dateTo: DateTime!
    $groups: [String]
    $projects: [UUID]
  ) {
    data: leadAgeTotals(
      dateFrom: $dateFrom
      dateTo: $dateTo
      groups: $groups
      projects: $projects
    ) {
      groupName
      groupTitle
      leadsCount
    }
  }
`;

export const LEAD_DURATION_TOTALS_QUERY = gql`
  query leadDurationTotals(
    $dateFrom: DateTime!
    $dateTo: DateTime!
    $groups: [String]
    $projects: [UUID]
  ) {
    data: leadDurationTotals(
      dateFrom: $dateFrom
      dateTo: $dateTo
      groups: $groups
      projects: $projects
    ) {
      groupName
      groupTitle
      leadsCount
    }
  }
`;
