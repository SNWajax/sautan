import React from 'react'
import Note from './Note'
import {FaPlusCircle} from 'react-icons/fa'

class Board extends React.Component {

    // Universal Properties ************************************************************
    constructor(props){
        super(props);
        this.state = {
            notes: [
                // {
                //     id: 0,
                //     note: "YOLO!"
                // },
                // {
                //     id: 1,
                //     note: "Meh"
                // }
            ]
        }
        this.add = this.add.bind(this);
        this.nextID = this.nextID.bind(this);
        this.eachNote = this.eachNote.bind(this);
        this.update = this.update.bind(this);
        this.remove = this.remove.bind(this);
    }

    // Functions *************************************************************************
    update (newText, i){                                            //  Values are retrieved from Notes.save()
        console.log("Updating values at index: ", i, newText);
        this.setState(prevState => ({
            notes: prevState.notes.map(
                note => (note.id !== i ) ? note: {...note, note: newText}   //  ... means to take all
            )
        }))
    }

    componentWillMount(){
        var self = this
        if(this.props.count){                                       //  Mention Props count in index.js file
            fetch(`https://baconipsum.com/api/?type=all-meat&sentences=${this.props.count}`)    //  Loading data
                .then(response => response.json())                  //  Converting to JSON
                .then(json => json[0]                               //  Splitting the JSON
                        .split('. ')
                        .forEach(sentence => self.add(sentence.substring(0, 25))))              //  Displaying on first 25 chars.
        }
    }

    add(text){                                                      //  Add does not refer to Note.js
        this.setState (prevState => ({
            notes: [
                ...prevState.notes,                                 //  Create a new array with previous Notes and append new Note
                {
                    id: this.nextID(),
                    note: text
                }
            ]
        }))
    }

    nextID(){                                                       //  Incremenet ID when you add new note
        this.uniqueID = this.uniqueID || 0;
        return this.uniqueID++;
    }

    remove(id){                                                     //  Refers to Note.remove()
        console.log("Removing Note: ", id);
        this.setState(prevState => ({
            notes: prevState.notes.filter(note => note.id !== id)
        }))
    }

    eachNote(note, i){
        return (
            <Note
                key = {note.id}                                           
                index = {note.id}                                         //  Index to refer using primaryID
                onChange = {this.update}                            //  Add prop onChange to Update
                onRemove = {this.remove}                            //  Add prop onRemove to Delete
            >
                {note.note}
            </Note>
        )
    }

     // Final Rendering **********************************************************
    render(){
        return (                                                    //  Iterates over each all elements in notes dict
            <div className = "board">
                {this.state.notes.map(this.eachNote)}
                <button onClick={this.add.bind(null, "Text Area")}  //  To add new element with default parameters
                    id="add">
                        <FaPlusCircle />
                </button>
            </div>
        )
    }
}

export default Board;