//299 thunderstorm https://cdn.patchcdn.com/users/86497/2016/06/T800x600/2016065769874831b37.jpg
//499 drizzle https://viequesdreamhousediary.files.wordpress.com/2011/03/rain-on-windshield.jpg
//599 snow http://s3-eu-west-2.amazonaws.com/lifeinnorway/wp-content/uploads/2012/04/26094232/snow-in-trondheim.jpg
//699 rain http://onlineclock.net/bg/rain/rain.jpg
//799 fog http://dreamatico.com/data_images/fog/fog-6.jpg
//800 clear http://i1.trekearth.com/photos/25634/on_a_clear_day.jpg
//>800 cloudy http://meship.com/Blog/wp-content/uploads/2011/06/cloud-forecast.jpg
//appid=70551d08bee698de3d8adde0347620ea

$(function(){ //WEATHER API START
  var F = false;
  var apiData;
  
    var backGroundImg = [
    'https://cdn.patchcdn.com/users/86497/2016/06/T800x600/2016065769874831b37.jpg',
    'https://viequesdreamhousediary.files.wordpress.com/2011/03/rain-on-windshield.jpg',
    'https://i.ytimg.com/vi/Ftu5ZpAk8dM/maxresdefault.jpg',
    'http://s3-eu-west-2.amazonaws.com/lifeinnorway/wp-content/uploads/2012/04/26094232/snow-in-trondheim.jpg',
    'http://dreamatico.com/data_images/fog/fog-6.jpg',
    'http://i1.trekearth.com/photos/25634/on_a_clear_day.jpg',
    'http://meship.com/Blog/wp-content/uploads/2011/06/cloud-forecast.jpg'
  ];
  
  function displayTemp(C,F){
    if(F) 
    {
      return Math.round(C * 9 / 5 + 32)+'&deg; F';
    }
    return Math.round(C) + '&deg; C';
  }
  

  
  function render(data, F){
    var currentWeather = data.weather[0].description;
    var currentTemp = displayTemp(data.main.temp, F);
    var currentWindSpeed = data.wind.speed+'mph';
    var icon = data.weather[0].icon;
    
    $('#currentTemp').html(currentTemp);
    $('#currentWeather').html(currentWeather);
    
    var apiIcon = 'http://openweathermap.org/img/w/' + icon + '.png';
    
    $('#currentWindSpeed').html('WindSpeed: '+currentWindSpeed);
    $('#currentWeather').prepend("<img src="+apiIcon+">");
  }
  
  $.getJSON('https://freegeoip.net/json/').done(function(location){
    // console.log(data);
    $('#country').html(location.country_name);
    $('#city').html(location.city);
    $('#latitude').html(location.latitude);
    $('#longitude').html(location.longitude);
    
    $.getJSON('http://api.openweathermap.org/data/2.5/weather?q=&lat='+location.latitude+'&lon='+location.longitude+'&units=metric&appid=89c8e6c753fb4c78bc5b198b77de4e5b', function(data){
      
      apiData = data;
      console.log(apiData);
      render(apiData,F);
      
      $('#toggle').click(function(e){
        e.preventDefault();
        F= !F;
        render(data,F);
      })
      
      var id = data.weather[0].id,
          bgIndex,
          backgroundId = [299,499,599,699,799,800];
      backgroundId.push(id); 
      bgIndex = backgroundId.sort().indexOf(id);
      $('#weather-modal').css('background-image','url('+backGroundImg[bgIndex]+')');
      console.log(backgroundId);
      console.log(bgIndex);
    })
  })
  
}); //WAETHER API APPS END

$('#wikipedia-modal').css('background-image','url("https://tctechcrunch2011.files.wordpress.com/2015/02/wikipedia-down.png")');

$('#search-button').click(function(){
  var searchField = $('#search-field').val();
  var url="https://en.wikipedia.org/w/api.php?action=opensearch&search=" +searchField+ "&format=json&callback=?";
  $.ajax({
    type: 'GET',
    url: url,
    async: false,
    dataType: 'json',
    success: function(data){
      // Title index data[1][0]
      // Description index data[2][0]
      // Link Index data[3][0] 
      $('#search-output').html(''); //deleting previous seerch
      for(var i=0; i<data[1].length; i++){
         $('#search-output').append("<li><a target='_blank' href=" +data[3][i]+ "><h3>" +data[1][i]+ "</h3></a><p class='white'>" +data[2][i]+ "</p></li>");
      }
      $('#search-field').val('');
    },
    error:  'error'
  });

});

 $('#search-field').keypress(function(e){ //ENTER KEY EVENT FOR SEARCH INPUT
    var key = e.which;
    if(key == 13){
      $('#search-button').click();
    }
  });