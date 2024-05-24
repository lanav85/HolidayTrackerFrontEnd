const url_host = "http://localhost:8080";
//USER ENDPOINTS
export function getUser(userId, onSuccess) {
  try {
    fetch(url_host + `/users?userId=${userId}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        onSuccess(data);
      });
  } catch (error) {
    console.error("Failed to get user:", error);
  }
}
export function deleteUser(userId, onSuccess) {
  try {
    fetch(url_host + `/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete user");
        }
        return response.text();
      })
      .then((result) => {
        onSuccess(result);
      });
  } catch (error) {
    console.error("Failed to delete user:", error);
  }
}
export function putUser(userId, user, onSuccess) {
  try {
    fetch(url_host + `/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((result) => {
        onSuccess(result);
      });
  } catch (error) {
    console.error("Failed to update user:", error);
  }
}
//ROLE ENDPOINTS

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
//DEPARTMENT ENDPOINTS

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
export function getUsersByDepartmentId(departmentID, onSuccess) {
  try {
    fetch(url_host + `/users?departmentId=${departmentID}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        const formattedData = data.map((item) => {
          const userData = JSON.parse(item.data);
          return {
            name: userData.name,
            userID: item.userID,
            email: item.email,
          };
        });
        onSuccess(formattedData);
      });
  } catch (error) {
    console.error(
      "Failed to fetch users for departmentId " + departmentID,
      error
    );
  }
}
export function deleteDepartment(departmentID, onSuccess) {
  try {
    fetch(url_host + `/DeleteDepartment/${departmentID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete department");
        }
        return response.text();
      })
      .then((result) => {
        onSuccess(result);
      });
  } catch (error) {
    console.error("Failed to delete department:", error);
  }
}
export function createDepartment(department, onSuccess) {
  try {
    fetch(url_host + `/CreateNewDepartment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(department),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create department");
        }
        return response.json();
      })
      .then((result) => {
        onSuccess(result);
      });
  } catch (error) {
    console.error("Failed to create department:", error);
  }
}
