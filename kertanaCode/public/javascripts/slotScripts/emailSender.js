function sendEmail() { 
    Email.send({ 
      Host: "smtp.gmail.com", 
      Username: "", 
      Password: "", 
      To: '', 
      From: "", 
      Subject: "Test", 
      Body: "Test", 
    }) 
  } 