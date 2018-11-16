import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Image, List, Icon} from 'semantic-ui-react';

class GifBox extends Component {
    render() {
        return (
            <>
                <div className="gif-box">
                    {this.props.mainStore.searchedGIFs.length > 0 ?
                        <List horizontal>
                            {this.props.mainStore.searchedGIFs.map((gif) => {
                                return <List.Item className="container" key={gif.id}>
                                    <img src={gif.images.fixed_height_small.url}/>
                                    <div className="overlay">
                                        <Icon className="send-icon" name="send" size="huge"/>
                                    </div>
                                </List.Item>
                            })}
                        </List>
                        : <div>Enter a search term for GIFY</div>
                    }
                </div>
            </>
        )
    }
}

export default inject("mainStore")(observer(GifBox));