import { Fragment } from 'react';
import Head from 'next/head';
import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';



function HomePage(props) {
    return (
        <Fragment>
          <Head>
            <title>Space Meetups</title>
            <meta
              name='description'
              content='Browse a huge list of highly active fake Space meetups!'
            />
          </Head>
          <MeetupList meetups={props.meetups} />;
        </Fragment>
      );
    }
    

export async function getStaticProps() {
   
    const client = await MongoClient.connect(
        'mongo'
      );
      const db = client.db();
    
      const meetupsCollection = db.collection('meetups');
    
      const meetups = await meetupsCollection.find().toArray();
    
      client.close();


    return {
        props: {
            meetups: meetups.map((meetup) => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
            })),
        },
     
    };
}

export default HomePage;
