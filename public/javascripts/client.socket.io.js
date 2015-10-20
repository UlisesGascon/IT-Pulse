$(document).ready(function(){

  var server_name = 'http://experimentos-ulisesgascon.c9.io/';
  var socket = io.connect(server_name);

  console.log('Connecting to server ' + server_name);

// Js stats
var jsPositiveTotalMessages = 0;
var jsPositiveTotalValues = 0;
var jsNegativeTotalMessages = 0;
var jsNegativeTotalValues = 0;
var jsNeutralTotalMessages = 0;


// Node stats
var nodePositiveTotalMessages = 0;
var nodePositiveTotalValues = 0;
var nodeNegativeTotalMessages = 0;
var nodeNegativeTotalValues = 0;
var nodeNeutralTotalMessages = 0;


// Github stats
var ghPositiveTotalMessages = 0;
var ghPositiveTotalValues = 0;
var ghNegativeTotalMessages = 0;
var ghNegativeTotalValues = 0;
var ghNeutralTotalMessages = 0;


// Auto Stats


function sentimentGithub(data){
  if(data === 0) {
    ghNeutralTotalMessages++;
    return '<p class="text-muted">Neutral ('+data+')</p>';
  } else if (data >= 0) {
    ghPositiveTotalMessages++;
    ghPositiveTotalValues += data;
    return '<p class="text-success">Positive ('+data+')</p>';
  } else {
    ghNegativeTotalMessages++;
    ghNegativeTotalValues += data;
    return '<p class="text-danger">Negative ('+data+')</p>';
  }
}

function sentimentJs(data){
  if(data === 0) {
    jsNeutralTotalMessages++;
    return '<p class="text-muted">Neutral ('+data+')</p>';
  } else if (data >= 0) {
    jsPositiveTotalMessages++;
    jsPositiveTotalValues += data;
    return '<p class="text-success">Positive ('+data+')</p>';
  } else {
    jsNegativeTotalMessages++;
    jsNegativeTotalValues += data;
    return '<p class="text-danger">Negative ('+data+')</p>';
  }
}

function sentimentNode(data){
  if(data === 0) {
    nodeNeutralTotalMessages++;
    return '<p class="text-muted">Neutral ('+data+')</p>';
  } else if (data >= 0) {
    nodePositiveTotalMessages++;
    nodePositiveTotalValues += data;
    return '<p class="text-success">Positive ('+data+')</p>';
  } else {
    nodeNegativeTotalMessages++;
    nodeNegativeTotalValues += data;
    return '<p class="text-danger">Negative ('+data+')</p>';
  }
}


function updateGlobal () {
  
var jsMessages = jsPositiveTotalMessages + jsNegativeTotalMessages + jsNeutralTotalMessages;
var jsValue = jsPositiveTotalValues + jsNegativeTotalValues;
var nodeMessages = nodePositiveTotalMessages + nodeNegativeTotalMessages + nodeNeutralTotalMessages;
var nodeValue = nodePositiveTotalValues + nodeNegativeTotalValues;
var ghMessages = ghPositiveTotalMessages + ghNegativeTotalMessages +ghNeutralTotalMessages;
var ghValue = ghPositiveTotalValues + ghNegativeTotalValues;

var allPositiveValues = ghPositiveTotalValues + nodePositiveTotalValues + jsPositiveTotalValues;
var allPositiveMessages = ghPositiveTotalMessages + nodePositiveTotalMessages + jsPositiveTotalMessages;
var allNegativeValues = ghNegativeTotalValues + nodeNegativeTotalValues + jsNegativeTotalValues;
var allNegativeMessages = ghNegativeTotalMessages + nodeNegativeTotalMessages + jsNegativeTotalMessages;
var allNeutralMessages = ghNeutralTotalMessages + nodeNeutralTotalMessages + jsNeutralTotalMessages;

var allValue = allPositiveValues + allNegativeValues;
var allMessages = allNeutralMessages + allNegativeMessages + allPositiveMessages;
  
function drawPie (id, positive, negative, neutral) {
  
function pie(ctx, w, h, datalist) {
  var radius = h / 2 - 5;
  var centerx = w / 2;
  var centery = h / 2;
  var total = 0;
  for(var x=0; x < datalist.length; x++) { 
    total += datalist[x]; 
  }
  var lastend=0;
  var offset = Math.PI / 2;
  for(var x=0; x < datalist.length; x++){
    var thispart = datalist[x]; 
    ctx.beginPath();
    ctx.fillStyle = colist[x];
    ctx.moveTo(centerx,centery);
    var arcsector = Math.PI * (2 * thispart / total);
    ctx.arc(centerx, centery, radius, lastend - offset, lastend + arcsector - offset, false);
    ctx.lineTo(centerx, centery);
    ctx.fill();
    ctx.closePath();		
    lastend += arcsector;	
  }
}

var datalist= new Array(positive, negative, neutral); 
var colist = new Array('#DFF0D8', '#F2DEDE', '#F7F7F9');
var canvas = document.getElementById(id); 
var ctx = canvas.getContext('2d');
pie(ctx, canvas.width, canvas.height, datalist); 

}  


  $('#global-tweets').html(
    '<h4>Total Tweets</h4>'+
    '<div><canvas id="globalChart" width="150" height="150"></canvas></div>'+
    '<div><p class="text-success">Positive: '+allPositiveMessages+' ( '+allPositiveValues+' points)</p>'+
    '<p class="text-danger">Negative: '+allNegativeMessages+' ( '+allNegativeValues+' points)</p>'+
    '<p class="text-muted">Neutral: '+allNeutralMessages+'</p>'+
    '<p><b>Total: '+allMessages+' ( '+allValue+' points)</b></p></div>'
  );
  
  $('#github-tweets').html(
    '<h4>Github & Git</h4>'+
    '<div><canvas id="githubChart" width="150" height="150"></canvas></div>'+
    '<div><p class="text-success">Positive: '+ghPositiveTotalMessages+' ( '+ghPositiveTotalValues+' points)</p>'+
    '<p class="text-danger">Negative: '+ghNegativeTotalMessages+' ( '+ghNegativeTotalValues+' points)</p>'+
    '<p class="text-muted">Neutral: '+ghNeutralTotalMessages+'</p>'+
    '<p><b>Total: '+ghMessages+' ( '+ghValue+' points)</b></p></div>'
  );

  $('#js-tweets').html(
    '<h4>Js</h4>'+
    '<div><canvas id="jsChart" width="150" height="150"></canvas></div>'+
    '<div><p class="text-success">Positive: '+jsPositiveTotalMessages+' ( '+jsPositiveTotalValues+' points)</p>'+
    '<p class="text-danger">Negative: '+jsNegativeTotalMessages+' ( '+jsNegativeTotalValues+' points)</p>'+
    '<p class="text-muted">Neutral: '+jsNeutralTotalMessages+'</p>'+
    '<p><b>Total: '+jsMessages+' ( '+jsValue+' points)</b></p></div>'
  ); 
  
  $('#node-tweets').html(
    '<h4>Node</h4>'+
    '<div><canvas id="nodeChart" width="150" height="150"></canvas></div>'+
    '<div><p class="text-success">Positive: '+nodePositiveTotalMessages+' ( '+nodePositiveTotalValues+' points)</p>'+
    '<p class="text-danger">Negative: '+nodeNegativeTotalMessages+' ( '+nodeNegativeTotalValues+' points)</p>'+
    '<p class="text-muted">Neutral: '+nodeNeutralTotalMessages+'</p>'+
    '<p><b>Total: '+nodeMessages+' ( '+nodeValue+' points)</b></p></div>'
  ); 
  
drawPie ("globalChart", allPositiveMessages, allNegativeMessages, allNeutralMessages);
drawPie ("githubChart", ghPositiveTotalMessages, ghNegativeTotalMessages, ghNeutralTotalMessages); 
drawPie ("jsChart", jsPositiveTotalMessages, jsNegativeTotalMessages, jsNeutralTotalMessages); 
drawPie ("nodeChart", nodePositiveTotalMessages, nodeNegativeTotalMessages, nodeNeutralTotalMessages); 
}

updateGlobal();


  socket.on('github', function(data){
    console.log(data);
    $('#col1-tweets').prepend('<div class="panel panel-default"><div class="panel-body">'+
    '<img src="'+data.tweetUsserPhoto+'" class="pull-left img-circle profile_picture">'+ 
      '<b>'+data.tweeter + '</b> said ' +
      '<i>'+data.tweet+'</i>' + 
      '<hr class="hr-twitter">'+sentimentGithub(data.sentiment.score)
      + '</div></div>');
    $('#col1-stats').html('<h3>#Github & #Git <span class="pull-right">[<span class="text-success"> '
    + ghPositiveTotalMessages +' </span>|<span class="text-muted"> '
    + ghNeutralTotalMessages +' </span>|<span class="text-danger"> '
    + ghNegativeTotalMessages +' </span>]</span></h3>');
    updateGlobal();
  });
  
  socket.on('js', function(data){
    console.log(data);
    $('#col2-tweets').prepend('<div class="panel panel-default"><div class="panel-body">' +
    '<img src="'+data.tweetUsserPhoto+'" class="pull-left img-circle profile_picture">'+  
      '<b>'+data.tweeter + '</b> said ' +
      '<i>'+data.tweet+'</i>' + 
      '<hr class="hr-twitter">'+sentimentJs(data.sentiment.score)
      + '</div></div>');
    $('#col2-stats').html('<h3>#JS <span class="pull-right">[<span class="text-success"> '
    + jsPositiveTotalMessages +' </span>|<span class="text-muted"> '
    + jsNeutralTotalMessages +' </span>|<span class="text-danger"> '
    + jsNegativeTotalMessages +' </span>]</span></h3>');
    updateGlobal();
  });
  
  socket.on('nodejs', function(data){
    console.log(data);
    $('#col3-tweets').prepend('<div class="panel panel-default"><div class="panel-body">' + 
    '<img src="'+data.tweetUsserPhoto+'" class="pull-left img-circle profile_picture">'+ 
      '<b>'+data.tweeter + '</b> said ' +
      '<i>'+data.tweet+'</i>' + 
      '<hr class="hr-twitter">'+sentimentNode(data.sentiment.score)
      + '</div></div>');
    $('#col3-stats').html('<h3>#Node <span class="pull-right">[<span class="text-success"> '
    + nodePositiveTotalMessages +' </span>|<span class="text-muted"> '
    + nodeNeutralTotalMessages +' </span>|<span class="text-danger"> '
    + nodeNegativeTotalMessages +' </span>]</span></h3>');
    updateGlobal();
  });

});