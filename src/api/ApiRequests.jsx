// API.js

// Function to handle POST request
async function handlePostRequest(url, data) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error("Fetch POST Error:", error);
  }
}

// Function to handle PUT request
async function handlePutRequest(url, data) {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error("Fetch PUT Error:", error);
  }
}

// Function to handle DELETE request
async function handleDeleteRequest(url) {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error("Fetch DELETE Error:", error);
  }
}

// USER ENDPOINTS

export function getUser(userId, onSuccess) {
  fetch(`/api/users?userId=${userId}`)
    .then((response) => response.json())
    .then((data) => onSuccess(data))
    .catch((error) => console.error("Failed to get user:", error));
}

export function deleteUser(userId, onSuccess) {
  handleDeleteRequest(`/api/users/${userId}`)
    .then((result) => onSuccess(result))
    .catch((error) => console.error("Failed to delete user:", error));
}

export function putUser(userId, user, onResult) {
  handlePostRequest(`/api/users/${userId}`, user)
    .then((result) => onResult(result))
    .catch((error) => console.error("Failed to update user:", error));
}

// ROLE ENDPOINTS

export function getRole(roleId, onSuccess) {
  fetch(`/api/Role?roleId=${roleId}`)
    .then((response) => response.json())
    .then((data) => onSuccess(data[0]))
    .catch((error) => console.error("Failed to fetch role:", error));
}

// DEPARTMENT ENDPOINTS

export function getAllDepartments(onSuccess) {
  fetch(`/api/Department`)
    .then((response) => response.json())
    .then((data) => onSuccess(data))
    .catch((error) => console.error("Failed to fetch departments:", error));
}

export function getDepartment(departmentID, onSuccess) {
  fetch(`/api/Department?departmentID=${departmentID}`)
    .then((response) => response.json())
    .then((data) => onSuccess(data[0]))
    .catch((error) => console.error("Failed to fetch department:", error));
}

export function getUsersByDepartmentId(departmentID, onSuccess) {
  fetch(`/api/users?departmentId=${departmentID}`)
    .then((response) => response.json())
    .then((data) => {
      const formattedData = data.map((item) => {
        const userData = JSON.parse(item.data);
        return {
          name: userData.name,
          userID: item.userID,
          email: item.email,
        };
      });
      onSuccess(formattedData);
    })
    .catch((error) =>
      console.error(
        `Failed to fetch users for departmentId ${departmentID}`,
        error
      )
    );
}

export function deleteDepartment(departmentID, onSuccess) {
  handleDeleteRequest(`/api/DeleteDepartment/${departmentID}`)
    .then((result) => onSuccess(result))
    .catch((error) => console.error("Failed to delete department:", error));
}

export function createDepartment(department, onSuccess) {
  handlePostRequest(`/api/CreateNewDepartment`, department)
    .then((result) => onSuccess(result))
    .catch((error) => console.error("Failed to create department:", error));
}

//HOLIDAY REQUESTS

export function getApprovedHolidayRequests(onSuccess) {
  fetch(`/api/holidayRequests?status=Approved`)
    .then((response) => {
      if (!response.ok)
        throw new Error("Failed to fetch approved holiday requests");
      return response.json();
    })
    .then((data) => onSuccess(data))
    .catch((error) =>
      console.error("Failed to fetch approved holiday requests:", error)
    );
}

export function getHolidayRequestsByDepartmentId(departmentID, onSuccess) {
  fetch(`/api/holidayRequests?departmentId=${departmentID}`)
    .then((response) => {
      if (!response.ok)
        throw new Error("Failed to fetch holiday requests by department Id");
      return response.json();
    })
    .then((data) => onSuccess(data))
    .catch((error) =>
      console.error("Failed to fetch holiday requests by department Id", error)
    );
}

export function getPendingHolidayRequestsByDepartmentId(
  departmentID,
  onSuccess
) {
  fetch(`/api/holidayRequests?departmentId=${departmentID}&status=Pending`)
    .then((response) => {
      if (!response.ok)
        throw new Error(
          "Failed to fetch pending holiday requests by department Id"
        );
      return response.json();
    })
    .then((data) => onSuccess(data))
    .catch((error) =>
      console.error(
        "Failed to fetch pending holiday requests by department Id",
        error
      )
    );
}

export function getPendingHolidayRequestsByUserId(userId, onSuccess) {
  fetch(`/api/holidayRequests?userId=${userId}&status=Pending`)
    .then((response) => {
      if (!response.ok)
        throw new Error("Failed to fetch pending holiday requests by user Id");
      return response.json();
    })
    .then((data) => onSuccess(data))
    .catch((error) =>
      console.error(
        "Failed to fetch pending holiday requests by user Id",
        error
      )
    );
}

export function createHolidayRequest(requestData, onSuccess, onError) {
  handlePostRequest(`/api/HolidayRequest`, requestData)
    .then((result) => onSuccess(result))
    .catch((error) => onError(error));
}

export function updateHolidayRequest(
  requestId,
  requestData,
  onSuccess,
  onError
) {
  handlePutRequest(`/api/HolidayRequest/${requestID}`, requestData)
    .then((result) => onSuccess(result))
    .catch((error) => onError(error));
}
