import Hero from '@/pages/Hero';
import Events from '@/pages/Events';
import Location from '@/pages/Location';
import { Fragment } from 'react';

// Main Invitation Content
export default function MainContent() {
  return (
    <Fragment>
      <Hero />
      <Events />
      <Location />
      {/* <Photos /> */}
      {/* <Wishes /> */}
      {/* <TableNumber /> */}
    </Fragment>
  );
}
