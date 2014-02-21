var path          = window.location.pathname;
var path_elements = path.split('/');
var app_id        = path_elements[2];
var edit_app_url  = '/apps/' + app_id + '/edit'
var request       = new XMLHttpRequest();

if (request == null){
  alert("Unable to create request");
}else{
  request.onreadystatechange = function() {
    if(request.readyState == 4){
      parse_response(request.responseText);
    }
  }

  request.open("GET", edit_app_url, true);
  request.send(null);
}

function parse_response(response)
{
  var pattern = /value="git@github.com:(.+)\.git/;
  var match   = pattern.exec(response);
  var repo    = match[1];

  find_commits(repo);
}

function find_commits(repo)
{
  var base_url = 'http://github.com/' + repo + '/compare/'
  var nodeList = document.querySelectorAll("abbr.commit");

  for (var i = 0, length = nodeList.length; i < length; i++) {
     var elm          = nodeList[i];
     var ref          = elm.getAttribute("title");
     var master_link  = create_compare_link(repo, ref, 'master');
     var staging_link = create_compare_link(repo, ref, 'staging');
     var elm2         = document.createElement('span');

     elm2.appendChild(document.createTextNode(' (compare:'));
     elm2.appendChild(master_link);
     elm2.appendChild(document.createTextNode(' / '));
     elm2.appendChild(staging_link);
     elm2.appendChild(document.createTextNode(')'));

     insertAfter(elm, elm2);
  }
}

function create_compare_link(repo, ref, base)
{
  var url = 'http://github.com/' + repo + '/compare/' + ref + '...' + base
  var link = document.createElement('a');

  link.appendChild(document.createTextNode(base));
  link.href = url;
  link.target = "_blank";
  link.style.paddingRight = '0px';

  return link;
}

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
