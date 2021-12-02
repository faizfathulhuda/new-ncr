export const hasPermission = ({
  group,
  name,
  type
}) => {
  const profile = JSON.parse(localStorage.getItem('profile'))
  return profile && profile
    .roles
    .permissions
    .some(permission => permission.group === group &&
      permission.name === name &&
      permission.permissions.includes(type))
}
