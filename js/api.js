//Global variables
export var globalData = {};
var urlData;
var jsonData = {};
var requestAPI = {
    playlist_tracks : 'https://api.spotify.com/v1/playlists/', // + {playlist_id}/tracks
    audio_features : 'https://api.spotify.com/v1/audio-features/' // + {id}
};

getUrlVars(window.location.href).then(function (params) {
    urlData = params;
    requestJSON(requestAPI.playlist_tracks + '37i9dQZEVXbMDoHDwVN2tF' + '/tracks').then(function (data) {
        jsonData = data;
        drawTable(jsonData);
    });
});

function getUrlVars(ar) {
    return new Promise(function (resolve) {
        var vars = ar.split('#')[1].split('&');
        var params = {};
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            params[pair[0]] = decodeURIComponent(pair[1]);
        }
        resolve(params);
    });
}

function requestJSON(url) {
    return new Promise(function (resolve) {
        $.ajax({
            url: url,
            headers: {
                'Authorization': 'Bearer ' + urlData.access_token
            },
            success: function(response) {
                resolve(response);
            }
        });
    });
}

function prepareTable(data) {
    return new Promise(function (resolve) {
        var tableData = [];
        let e = data.items;

        var promises = [];

        for(let i = 0; i < e.length; i++) {
            var promise = mergeObj(e[i]);
            promises.push(promise);
        }

        Promise.all(promises).then(function (vals) {
            tableData = globalData = vals;
            resolve(tableData);
        });
    });

    function mergeObj(e){
        return new Promise(function (resolve) {
            getAudioFeatures(e.track.id).then(function (aud_fet) {
                resolve (Object.assign(aud_fet, {
                    name: e.track.name,
                    duration: e.track.duration_ms,
                    popularity: e.track.popularity,
                    explicit: e.track.explicit,
                    id: e.track.id,
                    artists: filteredArtists(e.track.artists)
                }));
            });
        });
    }

        function filteredArtists(artists) {
            var tempArr = [];
            artists.forEach(function (e) {
                tempArr.push(e.name);
            });
            return tempArr;
        }

        function getAudioFeatures(id) {
            return new Promise(function (resolve) {
                requestJSON(requestAPI.audio_features + id).then(function (data) {
                    resolve({
                        danceability: data.danceability,
                        energy: data.energy,
                        key: data.key,
                        loudness: data.loudness,
                        mode: data.mode,
                        speechiness: data.speechiness,
                        acousticness: data.acousticness,
                        instrumentalness: data.instrumentalness,
                        liveness: data.liveness,
                        valence: data.valence,
                        tempo: data.tempo
                    });
                });
            });
        }
}

function drawTable(data) {
    //Prepare data for printing
    var tableHTML = ``;

    prepareTable(data).then(function (table) {
        for(var i = 0; i < table.length; i++){
            tableHTML += `<tr data-toggle="collapse" data-target="#div-${i}" class="clickable collapse-row collapsed rotate">
                            <td>${table[i].name}</td>
                            <td>${table[i].artists.toString()}</td>
                            <td>${table[i].duration}</td>
                            <td>${table[i].popularity}</td>
                            <td>${table[i].explicit}</td>
                            <td>${table[i].id}</td>
                            <td><a><i class="fas fa-chevron-down"></i></a></td>
                          </tr>
                          <tr>
                            <td colspan="7">
                                <div id="div-${i}" class="collapse">
                                    <table class="table table-borderless">
                                        <tr>
                                            <th>Danceability</th>
                                            <th>Energy</th>
                                            <th>Key</th>
                                            <th>Loudness</th>
                                            <th>Mode</th>
                                            <th>Speechiness</th>
                                            <th>Acousticness</th>
                                            <th>Instrumentalness</th>
                                            <th>Liveness</th>
                                            <th>Valence</th>
                                            <th>Tempo</th>
                                        </tr>
                                        <tr>
                                            <td><span class="badge dance">${table[i].danceability}</span></td>
                                            <td><span class="badge energy">${table[i].energy}</span></td>
                                            <td><span class="badge key">${table[i].key}</span></td>
                                            <td><span class="badge loud">${table[i].loudness}</span></td>
                                            <td><span class="badge mode">${table[i].mode}</span></td>
                                            <td><span class="badge speech">${table[i].speechiness}</span></td>
                                            <td><span class="badge acoustic">${table[i].acousticness}</span></td>
                                            <td><span class="badge instrument">${table[i].instrumentalness}</span></td>
                                            <td><span class="badge live">${table[i].liveness}</span></td>
                                            <td><span class="badge valence">${table[i].valence}</span></td>
                                            <td><span class="badge tempo">${table[i].tempo}</span></td>
                                        </tr>
                                    </table>
                                </div>
                            </td>
                          </tr>`;
        }
        $('#data-table-1').append(tableHTML);

        //Rotating arrow
        $(".rotate").click(function(){
            $(this).find('i').toggleClass("down")  ;
        });
    });
}

