import React, { Component } from 'react';
import axios from 'axios';

import Wrapper from '../components/Wrapper';
import ToggleBox from '../components/ToggleBox';
import Form from '../components/Form';
import ListMemories from '../components/ListMemories';

export default class Memories extends Component {
   state = {
      memories: [],
   };

   componentDidMount() {
      this.getMemories();
   }

   getMemories = () => {
      axios
         .get('/api/memories')
         .then((res) => {
            if (res.data) {
               this.setState({
                  memories: res.data,
               });
            }
         })
         .catch((err) => console.log(err));
   };

   render() {
      let { memories } = this.state;
      const text =
         'The impact Caleb made on everyone around him is everlasting.';
      const inputs = [
         {
            type: 'text',
            name: 'full_name',
            placeholder: 'Your Full Name (optional)',
         },
         {
            type: 'text',
            name: 'title',
            placeholder: 'Memory Title',
            required: true,
         },
      ];

      const form = {
         style: { background: 'black' },
         method: 'POST',
         inputs: inputs,
         textarea: 'true',
         submit: 'Share Memory',
         onClick: '',
      };
      const toggleText =
         "We'd love for you to add your own memories of Caleb to our Memory Book.";

      return (
         <React.Fragment>
            <Wrapper wrap="style1" title="Memory Book" top text={text} />
            <ToggleBox action="show" text={toggleText}>
               <Form
                  style={{ background: 'black' }}
                  method={'POST'}
                  inputs={inputs}
                  textarea
                  submit={'Share'}
                  onClick={''}
               />
            </ToggleBox>
            <ListMemories memories={memories} />
         </React.Fragment>
      );
   }
}
