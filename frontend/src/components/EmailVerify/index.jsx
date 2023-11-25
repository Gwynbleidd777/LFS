import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useHistory from 'react';
import axios from 'axios';

const EmailVerify = () => {
  const { id, token } = useParams();
  const history = useHistory();
  const [verificationStatus, setVerificationStatus] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const url = `http://localhost:8080/api/users/${id}/verify/${token}`;
        const response = await axios.get(url);
        setVerificationStatus(response.data.message);
        // Check if verification is successful
        if (response.status === 200) {
          // Redirect to the welcome page if verification is successful
          history.push('/welcome');
        }
      } catch (error) {
        console.error(error);
        setVerificationStatus('Failed to verify email.');
      }
    };

    verifyEmail();
  }, [id, token, history]);

  return (
    <div>
      <h2>Email Verification Status: {verificationStatus}</h2>
      {/* You can include additional UI elements or messages here */}
    </div>
  );
};

export default EmailVerify;
