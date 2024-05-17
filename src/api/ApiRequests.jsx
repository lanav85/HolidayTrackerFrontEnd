const url_host = "http://localhost:8080";

export function getDepartment(departmentID, onSuccess) {
  try {
    fetch(url_host + `/Department?departmentID=${departmentID}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        onSuccess(data[0]);
      });
  } catch (error) {
    console.error("Failed to fetch department:", error);
  }
}

export function getRole(roleId, onSuccess) {
  try {
    fetch(url_host + `/Role?roleId=${roleId}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        onSuccess(data[0]);
      });
  } catch (error) {
    console.error("Failed to fetch role:", error);
  }
}
