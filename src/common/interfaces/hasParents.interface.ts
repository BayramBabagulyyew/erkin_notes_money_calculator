export interface HasDepartmentId {
  departmentId?: number;
}

export interface HasFilialId {
  filialId?: number;
}

export interface HasOrganizationId {
  organizationId?: number;
}

export interface CheckedUserIds {
  organizationId?: number;
  departmentId?: number;
  filialId?: number;
}
