import React, { Component } from 'react';
import axios from 'axios';
import DataListView from 'components/DataListView';

class Asignatura extends Component {

    state = {

        subjects: {},
        status: null,
        lastChecked: null,
        selectedItems: null,
    }

    componentWillMount() {
        this.getSubjects();
    }

    clickItem = (item, event) => {
        event.preventDefault();
        this.props.onClickItem(item);
    };

    onCheckItem = (event, id) => {
       /* if (
            event.target.tagName === 'A' ||
            (event.target.parentElement &&
                event.target.parentElement.tagName === 'A')
        ) {
            return true;
        }
        if (this.state.lastChecked === null) {
            this.setState({
                lastChecked: id,
            });
        }

        let selectedItems = this.state.selectedItems;
        if (selectedItems.includes(id)) {
            selectedItems = selectedItems.filter((x) => x !== id);
        } else {
            selectedItems.push(id);
        }
        this.setState({
            selectedItems,
        });

        if (event.shiftKey) {
            var items = this.state.items;
            var start = this.getIndex(id, items, 'id');
            var end = this.getIndex(this.state.lastChecked, items, 'id');
            items = items.slice(Math.min(start, end), Math.max(start, end) + 1);
            selectedItems.push(
                ...items.map((item) => {
                    return item.id;
                })
            );
            selectedItems = Array.from(new Set(selectedItems));
            this.setState({
                selectedItems,
            });
        }*/
        document.activeElement.blur();
    };

    getSubjects = () => {
        //peticion ajax
        axios.get("http://localhost:3800/subjects/") //url a la que le vamos a hacer una peticion por get a la API REST
            .then(res => {
                console.log(res.data);
                this.setState({
                    subjects: res.data.subjects,
                    status: 'success'
                });
            });
    }


    render() {


        return (

            <section id="content" >

                {this.state.status === 'success' &&

                    <div>
                        <h2 className="subheaderdos">Asignaturas</h2>
                        {this.state.subjects.map((subject, i) => {
                            return (
                                <DataListView
                                    key={subject.id}
                                    subject={subject}
                                    onCheckItem={this.onCheckItem}
                                />
                            );
                        })
                        }
                    </div>

                }



            </section>


        );


    }



}

export default Asignatura;