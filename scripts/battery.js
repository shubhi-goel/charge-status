
var battery = navigator.battery || navigator.mozBattery || navigator.webkitBattery;
var indicator1 = document.getElementById('indicator1');
var indicator2 = document.getElementById('indicator2');
var batteryCharge = document.getElementById('battery-charge');
var batteryTop = document.getElementById('battery-top');
var chargeIcon = document.getElementById('battery-charging');
var chargingState = 0;
function updateBatteryStatus() 
{  
  var percentage = Math.round(battery.level * 100);
  indicator1.innerHTML = "Battery charge at " + percentage + "% ";
  batteryCharge.style.width = percentage + '%'; 
  if(percentage > 99) 
  {
    batteryTop.style.backgroundColor = '#58E000';
    batteryCharge.style.backgroundColor = '#2219B2';
    createNotification("Device battery fully charged.");
  }
  if(battery.charging) 
  {  
    if(chargingState == 1 || chargingState == 0) 
    {
      batteryTop.style.backgroundColor = '#FFDA73';
      batteryCharge.style.backgroundColor = '#FFBB00';
      indicator2.innerHTML = " Battery is charging"; 
      chargeIcon.style.visibility = 'visible';
      createNotification("Device battery now charging.");
      chargingState = 2;
    }
  } 
  else if(!battery.charging)
        {
          if(chargingState == 2 || chargingState == 0) 
          {
            batteryTop.style.backgroundColor = '#eee';
            batteryCharge.style.backgroundColor = '#eee';
            indicator2.innerHTML = "Battery not charging";
            chargeIcon.style.visibility = 'hidden';
            createNotification("Device battery is not charging.");
            chargingState = 1;
          }
        }
}

function createNotification(message) 
{
  if (!"Notification" in window) 
  {
    console.log("This browser does not support notifications.");
  }
  else if (Notification.permission === "granted") 
        {  
          var notification = new Notification('Battery status', { body: message });
        }
       else if (Notification.permission !== 'denied') 
       {
          Notification.requestPermission(function (permission){if(!('permission' in Notification)) {Notification.permission = permission;}
                                                               if (permission === "granted") {var notification = new Notification('Battery status', { body: message });}});
       }
}
battery.addEventListener("chargingchange", updateBatteryStatus, false);
battery.addEventListener("levelchange", updateBatteryStatus, false);
updateBatteryStatus();