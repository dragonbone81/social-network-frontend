import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {List, Icon} from 'semantic-ui-react';

class GifBox extends Component {
    render() {
        return (
            <>
                <div className="gif-box">
                    {this.props.mainStore.searchedGIFs.length > 0 ?
                        <List horizontal>
                            {this.props.mainStore.searchedGIFs.map((gif) => {
                                return <List.Item onClick={() => {
                                    if (this.props.mainStore.realTime) {
                                        this.props.mainStore.postMessageWS(this.props.chat_id, gif.images.original.url, 'gifs', this.props.socket);
                                    } else {
                                        this.props.mainStore.postMessage(this.props.chat_id, gif.images.original.url, 'gifs');
                                    }
                                    this.props.addMessageToList(gif.images.original.url, this.props.mainStore.user.username, 'gifs');
                                }} className="container" key={gif.id}>
                                    <img alt={gif.title} src={gif.images.fixed_height_small.url}/>
                                    <div className="overlay">
                                        <Icon className="send-icon" name="send" size="huge"/>
                                    </div>
                                </List.Item>
                            })}
                        </List>
                        : <div className="empty-search"><h2>Enter a search term for GIFY</h2></div>
                    }
                </div>
            </>
        )
    }
}

export default inject("mainStore")(observer(GifBox));