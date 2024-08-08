import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');

    if (code) {
      async function fetchToken() {
        try {
          const response = await fetch(`http://localhost:8080/getAccessToken?code=${code}`);
          const data = await response.json();

          if (data.access_token) {
            localStorage.setItem('accessToken', data.access_token);
            navigate('/marketplace'); // Redirect to the marketplace if token is successfully set
          } else {
            console.error('Access token not found in response:', data);
            navigate('/');
          }
        } catch (error) {
          console.error('Error fetching token:', error);
          navigate('/');
        }
      }

      fetchToken();
    } else {
      navigate('/');
    }
  }, [navigate]);

  return <div>Loading...</div>;
}

export default AuthCallback;






// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// function AuthCallback() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const queryString = window.location.search;
//     const urlParams = new URLSearchParams(queryString);
//     const code = urlParams.get('code');

//     if (code) {
//       async function getAccessToken() {
//         try {
//           const response = await fetch(`http://localhost:8080/getAccessToken?code=${code}`, {
//             method: 'GET',
//           });

//           if (!response.ok) {
//             const errorText = await response.text();
//             console.error('Server error:', errorText);
//             throw new Error(`Server error: ${response.status} ${response.statusText}`);
//           }

//           const data = await response.json();
//           if (data.access_token) {
//             localStorage.setItem('accessToken', data.access_token);
//             navigate('/marketplace'); // Redirect to the desired page after login
//           } else {
//             console.error('Access token not found in response:', data);
//           }
//         } catch (error) {
//           console.error('Error fetching access token:', error);
//         }
//       }

//       getAccessToken();
//     }
//   }, [navigate]);

//   return null; // Render nothing while processing
// }

// export default AuthCallback;

// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// function AuthCallback() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const queryString = window.location.search;
//     const urlParams = new URLSearchParams(queryString);
//     const code = urlParams.get('code');

//     if (code) {
//       async function fetchToken() {
//         try {
//           const response = await fetch(`http://localhost:8080/getAccessToken?code=${code}`);
//           const data = await response.json();

//           if (data.access_token) {
//             localStorage.setItem('accessToken', data.access_token);
//             navigate('/marketplace');
//           } else {
//             navigate('/');
//           }
//         } catch (error) {
//           console.error('Error fetching token:', error);
//           navigate('/');
//         }
//       }
      
//       fetchToken();
//     } else {
//       navigate('/');
//     }
//   }, [navigate]);

//   return <div>Loading...</div>;
// }

// export default AuthCallback;