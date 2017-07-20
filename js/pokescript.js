var $pokeInput; 
var $pokeSearch = $('#pokeSearch');
$pokeSearch.on('click', function(event){

	event.preventDefault();

	$pokeInput = $('#pokeInput').val();

	$.ajax({
		url: "http://pokeapi.co/api/v2/pokemon/"+ $pokeInput,
		dataType: 'json',
		success: search,
		error: error
	});

});

function error(){
	alert('Pokemon no capturado');
}

function search (data){

	var $pokeId = data.id;

	//Shearch de name and type(s)
	var $pokeCard = $('.pokeCard');
	$pokeCard.empty();
	$pokeCard.append('<h2>' + data.name + '</h2>');
	$pokeCard.append('<img src=' + data.sprites.front_default + '>')

	data.types.forEach(function(i){

		$pokeCard.append('<p>' + i.type.name + '</p>');
	});

	//Search the description
	$.get('http://pokeapi.co/api/v1/pokemon/' + $pokeId, function(dataV1){

		var $uriDescription;
		$uriDescription = dataV1.descriptions[1].resource_uri;

		$.get('http://pokeapi.co' + $uriDescription, function(dataV1uri){

			$pokeCard.append('<p>'+ dataV1uri.description + '</p>');
		});
	});


}

