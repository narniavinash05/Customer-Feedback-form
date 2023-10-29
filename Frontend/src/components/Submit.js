export const Submit = async ({
  setIsLoading,
  getFeedback,
  payload,
  setRating,
  setComment,
}) => {
  const authenticationUrl = 'http://localhost:8080/api/feedback/login';
  const submitUrl = 'http://localhost:8080/api/feedback/';

  const authData = {
    userName: 'avinash',
    password: 'avinash',
  };

  try {
    const authResponse = await fetch(authenticationUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authData),
      credentials: 'include',
    });

    if (authResponse.ok) {
      const jwt = await authResponse.text();

      const requestOptions = {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      };

      const postResponse = await fetch(submitUrl, requestOptions);
      if (postResponse.ok) {
        const responseData = await postResponse.json();
        console.log('Data from POST request:', responseData);
        setIsLoading(false);
        getFeedback();
        setComment('');
        setRating(); 
      } else {
        console.error('Error in POST request:', postResponse.status);
      }
    } else {
      console.error('Authentication failed:', authResponse.status);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
};
