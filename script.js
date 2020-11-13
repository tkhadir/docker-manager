const getPlayButton = (id) => {
    return '<button type="button" id="button_play" class="btn" onclick="run(\''+id+'\')"><i class="fa fa-play"></i></button>'
}
const getStopButton = (id) => {
    return '<button type="button" id="button_stop" class="btn" onclick="stop(\''+id+'\')"><i class="fa fa-stop"></i></button>'
}


class Image {
    constructor(id, tag, creationDate) {
        this.id = id
        this.tag = tag
        this.creationDate = creationDate
    }

    toHtml() {
        return '<tr>'
                +'<th scope="row">'+ this.id +'</th>'
                +'<td>' + this.tag + '</td>'
                +'<td>' + this.creationDate + '</td>'
                +'</tr>'
    }
}

class Container {
    constructor(id, name, status) {
        this.id = id
        this.name = name
        this.status = status
    }

    toHtml() {
        return '<tr>'
                +'<th scope="row">'+ this.id +'</th>'
                +'<td>' + this.name + '</td>'
                +'<td>' + this.status + '</td>'
                +'<td>' + getPlayButton(this.id) + '</td>'
                +'<td>' + getStopButton(this.id) + '</td>'
                +'</tr>'
    }
}

let fetchImages = () => {
    let options = {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        }
    }
    fetch('http://localhost:5555/images/json', options)
    .then(response => {
        response.text().then(data => {
            let images = []
            JSON.parse(data).filter(d => d.ParentId.length == 0).forEach(d => {
                images.push(new Image(d.Id, d.RepoTags, d.Created))
            })
            $("#images-list").html(images.map(i => i.toHtml()).join(''))
        }).catch(e => console.log(e))
    })
    .catch(error => {
        console.error(error)
        //alert('an error occcured during fetchall : ' + error)
    })
}


let fetchContainers = () => {
    let options = {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        }
    }
    fetch('http://localhost:5555/containers/json', options)
    .then(response => {
        response.json().then(data => {
            let containers = []
            data.forEach(d => {
                containers.push(new Container(d.Id.substring(0, 12), d.Image, d.Status))
            })
            $("#containers-list").html(containers.map(i => i.toHtml()).join(''))
        }).catch(e => console.log(e))
    })
    .catch(error => {
        console.error(error)
        //alert('an error occcured during fetchall : ' + error)
    })
}

let run = (id) => {
    let options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        }
    }
    fetch('http://localhost:5555/containers/'+id+'/start', options)
    .then(response => {
        console.log('done')
        fetchImages()
        fetchContainers()
    })
    .catch(error => {
        console.error(error)
        //alert('an error occcured during fetchall : ' + error)
    })
}

let stop = (id) => {
    let options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        }
    }
    fetch('http://localhost:5555/containers/'+id+'/stop', options)
    .then(response => {
        console.log('done')
        fetchImages()
        fetchContainers()
    })
    .catch(error => {
        console.error(error)
        //alert('an error occcured during fetchall : ' + error)
    })
}