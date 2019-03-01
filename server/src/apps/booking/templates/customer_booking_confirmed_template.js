function customerBookingConfirmedEmailTemplate(emailData) {
  return `<p>Hi <b>${emailData.firstName}</b>, thanks for booking with FeastHero!.</p>
     <p>Here’s everything you need to know for you class with ${emailData.chefName}:<p>
      <p>Class name: <b>${emailData.className}</b></p>
      <p>When: <b> ${emailData.selectedClassDateTime} </b></p>
      <h3>Join with this link: <a href=${emailData.zoomLink}> ${emailData.zoomLink} </a> </h3>
      <br/>
      <p>${emailData.classDescription}</p>
      <h4>  We look forward to having you join!</h4>
     `
}

module.exports = customerBookingConfirmedEmailTemplate;