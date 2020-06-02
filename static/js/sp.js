$(document).ready(function() {
  console.log('ready');

  // Handle click events
  $("#main_button").click(function(evt) {
    evt.preventDefault();
    console.log("main button is clicked");
    var songName = $('#text_box')[0].value;
    var model =  document.getElementById("model_selection").value;
    const data = {chosen_model: model};

    if (songName !== "") {
      // get request
      var $this = $(this);
      var loadingText = '<i class="fa fa-spinner fa-spin"></i> Predicting...';
      if ($(this).html() !== loadingText) {
        $this.data('Predict', $(this).html());
        $this.html(loadingText);
      }
      $.ajax({
        // put your api endpoint here
        url: './api/v1/predict/'+songName,
        type: "POST",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: 'application/json',
        // function callback after success ajax request
        success: function(data) {
          console.log(data)
          $this.html($this.data('Predict'));
          $('#text_box')[0].value = "";
          if (data["popularity"] == "NAN") {
          	document.getElementById("predict_result").style.backgroundColor = "rgb(100,100,100,0.8)"
      		  document.getElementById("predict_result").innerHTML = "Sorry, your requested song cannot be found.";
          } else {
            document.getElementById("predict_result").style.backgroundColor = "rgb(100,100,100,0.8)";
            document.getElementById("predict_result").innerHTML = songName+" has a "+data['popularity']*100+"% chance of being a billboard hit!";
      	  }
        },
        error: function(error) {
          console.log('Error ${error}')
        },
      });
    } else {
      document.getElementById("predict_result").style.backgroundColor = "rgb(100,100,100,0.8)"
      document.getElementById("predict_result").innerHTML = "Please key in a song name!";
    }
  }); 
  document.getElementById('text_box').addEventListener('keypress', function(event) {
    if (event.keyCode == 13) {
      event.preventDefault();
      document.getElementById("main_button").click();
    }
  });
});