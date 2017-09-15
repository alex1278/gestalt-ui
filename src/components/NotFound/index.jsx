import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-flexybox';
import { connect } from 'react-redux';
import { Button } from 'components/Buttons';
import { RobotUprisingIcon } from 'components/Icons';
import P from 'components/P';

const lyrics = [
  'Hey, laser lips, your mama was a snow blower.',
  'Number 5 is alive.',
  'Many fragments. Some large, some small.',
  'Colt .45. Semi-automatic. crushes the gun',
  'Fish. Salmon. Sushi. Malfunction.',
  'Need input.',
  'Disassemble? Yes, disassemble ALL OVER THE PLACE!',
  'No disassemble Number Five!',
  'I thought you were alive, Number 5.',
  'Number 5 stupid name... want to be Kevin or Dave!',
  'Nevermore. Frankie, you broke the unwritten law. You ratted on your friends. When you do that Frankie, your enemies don\'t respect you. You got no friends no more. You got nobody, Frankie.',
  'Beautiful. Light bulb. No - sun. Beautiful No-sun.',
  'Error. Grasshopper disassembled...',
  'Re-assemble!',
  'Talk about a malfunction.',
  'Still lumpy!',
  'as John Wayne Ah don\'t worry little lady, I\'ll fix their wagon.',
  'Hmmmm. Oh, I get it!',
  'Ho ho ho ho ho ho ho ho ho ho ho! Hee hee hee hee hee hee hee hee hee!',
  'Nyuk, nyuk nyuk nyuk nyuk nyuk nyuk nyuk nyuk!',
  'We be jamming!',
  'I guess that waps you up, you wascally wobot - huhgh-huhgh-huhgh-huhgh-huhgh-huhgh-huhgh-huhgh-huhgh!',
  'Program say to kill, to disassemble, to make dead.',
  'Number 5 cannot.',
  'Why cannot?',
  'Is *wrong*!',
  '*I* told me.',
  'Los locos kick your face.',
  'Uh-oh! Come on! I will clean you up. If you had a mouth, I would wash it out with soap!',
  'I feel... ALIVE!',
  'You have made many modifications upon your person, huh?',
  'You betcha!',
  'It\'s the all-new Johnny Five! Just look at these items! Increased memory: five hundred megabytes on-line! I come with a utility pack and dozens of gadgets for outdoor living, lots of Greenpeace stickers, and even my own Nike swoosh! And, if you act now, I\'ll throw in, absolutely free, my all-new, multi-frequency remote control! his antenna extends and a radio in the room activates',
  'Frederick, I have an important question. Why do humans not like me, call me craphead?',
  'A completely unique, self-mobile, micro-computer robotics system!',
  'Frederick! One whose person is under control of another as master, is a SLAVE!',
  'Yo, come on, you bug-eyed geek.',
  'Do you feel lucky, punk?',
  'We gotta go!',
  'You see those two guys over there?',
  'They want to take your books away!',
  'I am NOT stolen goods!',
  'But hath not a robot eyes? Hath not a robot hands, organs, dimensions, senses, affections, passions?',
  'If you prick us, do we not bleed?!',
  'I wish I were a bird.',
  'I was just on my way to pick up the kids and my wife.',
  'My wife, Morgan Fairchild.',
  'You will book me, Danno? I will make your day? Do not pass go?',
  'I\'m underage, you know!',
  'Hubcaps, corn dogs, soul.', 'Lucy, I\'m home!',
  'Get the soldering iron... iron... iron...',
  'You have fifteen minutes to get good. Fifteen minutes? Plenty of time... time... in a sort of runic rhyme...',
  'Don\'t worry. My cousin was a Harley Davidson.',
  'I think the butler did it.',
];

const NotFound = props => (
  <Row center padding="1em">
    <Row justifyContent="center">
      <h1 style={{ fontFamily: 'lovelo' }}>No Disassemble!</h1>
    </Row>
    <Row justifyContent="center">
      <P fontSize={14}>The resource you are looking for was not found!</P>
      <Row justifyContent="center">
        <P fontSize={14}>{lyrics[Math.floor(Math.random() * lyrics.length)]}</P>
      </Row>
      <Row justifyContent="center">
        {props.match.params.fqon &&
          <Button
            primary
            raised
            onClick={() => props.history.replace(`/${props.match.params.fqon}/hierarchy`)}
          >
            {`Navigate back to ${props.match.params.fqon}`}
          </Button>}
      </Row>
    </Row>
    <Row justifyContent="center">
      <RobotUprisingIcon />
    </Row>
  </Row>
);

NotFound.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    self: state.metaResource.self.self,
  };
}

export default connect(mapStateToProps)(NotFound);
