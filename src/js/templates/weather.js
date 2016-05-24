module.exports = '\
<h2><strong><%= city %></strong></h2>\
<h4><%= curdate %></h4>\
<span class="conditions"><%= curconditions %></span><br>\
<span class="temp">Temp. <%= curtemp %> &deg;<%= tempUnits %></span>\
\
<h3>Next days:</h3>\
\
<ul class="days">\
  <% for(var i=1; i<=5; i++){ \
    var item = forecast[i];\
    %>\
    <li>\
  	  <h4><%=item.date %></h4>\
  	  <span class="conditions"><%=item.text %></span><br>\
	  <span class="temp">Min. <%=item.low %> &deg;<%= tempUnits %></span><br>\
	  <span class="temp">Max. <%=item.high %> &deg;<%= tempUnits %></span>\
  	</li>\
  <% } %>\
</ul>';
