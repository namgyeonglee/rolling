const BASE_URL = "https://rolling-api.vercel.app";
const TEAM = "/5-10";

// 백그라운드 및 프로필 이미지 가져오기
export async function fetchImages(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

// 수신자 및 메시지 데이터 가져오기
export async function fetchRecipients(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}${TEAM}${endpoint}`, {
      headers: {
        accept: "application/json",
        "X-CSRFToken":
          "fMj2sOIqI9AcFOHzN97CRfUfKEmwG2fzuuVyuBRGtONF3PqIUvMX0XnEOEgXEjSn",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

// 데이터 추가하기
export async function postData(endpoint, data) {
  try {
    const response = await fetch(`${BASE_URL}${TEAM}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

// 데이터 수정하기
export async function putData(endpoint, data) {
  try {
    const response = await fetch(`${BASE_URL}${TEAM}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

// 데이터 삭제하기
export async function deleteData(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}${TEAM}${endpoint}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

// 데이터 일부 수정하기
export async function patchData(endpoint, data) {
  try {
    const response = await fetch(`${BASE_URL}${TEAM}${endpoint}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}
