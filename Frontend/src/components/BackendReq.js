export const BackendReq = async ({ setFeedback, setIsLoading, apiUrl }) => {
  const authenticationUrl = 'http://localhost:8080/api/feedback';
  
  const authData = {
    "userName": "avinash",
    "password": "avinash"
  };

  try {
    const authResponse = await fetch(authenticationUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authData),
      credentials: 'include',
    });

    if (authResponse.ok) {
      const jwt = await authResponse.text().replace(/\n/g, '');
      console.log(jwt);

      const requestOptions = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      };

      const getResponse = await fetch(apiUrl, requestOptions);

      if (getResponse.ok) {
        const responseData = await getResponse.json();
        console.log('Data from GET request:', responseData);
        setFeedback(responseData);
        setIsLoading(false);
      } else {
        console.error('Error in GET request:', getResponse.status);
      }
    } else {
      console.error('Authentication failed:', authResponse.status);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
};
