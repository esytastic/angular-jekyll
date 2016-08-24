gogoroApp.controller('moduleBethenext2ContactController', ["$scope", "$element", "$interval", "FallbackManagerFactory", "$rootScope", function ($scope, $element, $interval, FallbackManagerFactory, $rootScope) {

	$.fn.serializeObject = function()
	{
	    var o = {};
	    var a = this.serializeArray();
	    $.each(a, function() {
	        if (o[this.name] !== undefined) {
	            if (!o[this.name].push) {
	                o[this.name] = [o[this.name]];
	            }
	            o[this.name].push(this.value || '');
	        } else {
	            o[this.name] = this.value || '';
	        }
	    });
	    return o;
	};

	$scope.selected = '';

	$scope.select = function(option) {
		$scope.selected = $scope.selected == option ? '' : option;
		if ($scope.selected) {
			setTimeout(function() {
				$(window).scrollTo('#form-start', 800);
				$('.form.'+option+' input').first().focus();
				location.hash = "form-start";
			},100);
		}
	};

	$('.open-form').on('submit', function (e) {
	    e.preventDefault();
	    
	    var self = this;
		$('#open-form-submit').val('Sending...').attr('disabled','disabled');

		$.ajax($(this).attr('action'), {
		    type: "POST",
		    data: $(this).serializeObject(),
		    success: function (response, textStatus, xhr) {
		    	if (response.success) {
		    		$('#contact-form-sent').modal('show');
		    		$('input, textarea', $(self)).not('input[type=submit]').val('');
		    	} else {
		    		alert('Sorry! Your message was not sent. Please try again.');
		    	}
		        $('#open-form-submit').val('SUMBIT').removeAttr('disabled');
		    },
		    error: function (response) {
		    	alert('Sorry! Your message was not sent. Please try again.');
		    },
		    always: function(response) {
		    	$('#open-form-submit').val('SUMBIT').removeAttr('disabled');

		    }
		});
	});
}]);