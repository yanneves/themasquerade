
<% if(event.invited){ %>
	
	<div class="span4 offset4 centered">
		<p><small><%- event.invite_status.name %></small></p>
		<div class="btn-group btn-group-vertical btn-block">
			<% if(event.invite_status.rsvp_status === "attending"){ %>
				<button class="btn btn-success btn-large btn-block" disabled="disabled">Attending</button>
			<% } else { %>
				<button id="rsvpAttend" class="btn btn-inverse btn-large btn-block" data-loading-text="Attending...">Attending</button>
			<% } %>

			<% if(event.invite_status.rsvp_status === "declined"){ %>
				<button class="btn btn-danger btn-large btn-block" disabled="disabled">Not Attending</button>
			<% } else { %>
				<button id="rsvpDecline" class="btn btn-inverse btn-large btn-block" data-loading-text="Not Attending...">Not Attending</button>
			<% } %>
		</div>
		<button id="rsvpHelp" class="btn btn-link btn-block" data-placement="top" title="Facebook-driven RSVP" data-content="Please select whether you will 'Attend' or 'Decline' this event. Your status is synced with the Facebook event page."><i class="icon-question-sign icon-white"></i></button>
	</div>
	<div class="span1 hidden-phone">
		<p><small>&nbsp;</small></p>
		<div class="btn-group btn-group-vertical btn-block">
			<button class="btn btn-link btn-large btn-block" disabled="disabled">&nbsp;
				<% if(event.invite_status.rsvp_status === "attending"){ %>
					<span class="badge badge-success"><i class="icon-ok" style="margin-top:2px;"></i></span>
				<% } else { %>
					&nbsp;
				<% } %>
			</button>
			<button class="btn btn-link btn-large btn-block" disabled="disabled">
				<% if(event.invite_status.rsvp_status === "declined"){ %>
					<span class="badge badge-important"><i class="icon-remove" style="margin-top:2px;"></i></span>
				<% } else { %>
					&nbsp;
				<% } %>
			</button>
		</div>
	</div>

<% } else { %>
	<div class="span4 offset4 centered">
		<h2>Not authorized.</h2>
		<p>Please <a href="mailto:events@aaunel.com" title="RSVP Email">email</a> the organizer.</p>
	</div>
<% } %>
