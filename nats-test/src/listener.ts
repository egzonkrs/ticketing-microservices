import { randomBytes } from 'crypto';
import nats, { Message, Stan } from 'node-nats-streaming';
import { TicketCreatedListener } from './events/ticket-created-listener';

console.clear();
// stan is (client), "nats" backwards is "stan"
const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});

// this anon func will be executed after the client has successfully connected to NATS streaming server
stan.on('connect', () => {
  console.log('Listener connected to NATS');

  stan.on('close', () => {
    console.log('NATS connection closed!');
    process.exit();
  });

  new TicketCreatedListener(stan).listen();
});

// Keto lines poshte jane tu listen per interrupt ose terminate signals.
// interrupt 14-14 Graceful client shutdown
process.on('SIGINT', () => stan.close());
// terminate 14-14 Graceful client shutdown
process.on('SIGTERM', () => stan.close());

/*
- Important default Behavior! -
  
  const options = stan.subscriptionOptions().setManualAckMode(true)

  Kur na pranojna event prej subscriptions,
  edhe dojna me kry ni funksion si p.sh me rujt
  te dhana ne database, por ne ate moment shfaqet nje error ose dicka
  tjeter shkon incorrect p.sh s'mundemi me u connect me database 
  atehere eventi eshte LOST! mundemi me humbe important data, 
  kshtuqe tek 'subscriptionOptions' e shtojme opsionin 
  '.setManualAckMode(true)' (ack - acknowledgement - njohje - pranim - falenderim)
  Cka bon? Node NATS streaming library nuk ka me acknowledge automatikisht
  edhe s'ka me kallxu qe ka receive nje event, instead na len neve ne dore
  me bo naj process ose pune (possibly save some information to the database)
  edhe pastaj (after) qajo pune/process u kry (only after), kena me acknowledge
  mesazhin and say ok, gjithcka eshte procesu me sukses. Nese nuk e bojna
  acknowledge incoming event then NATS streaming server ka me prit nje kohe
  afersisht 30 sekonda by default, edhe pas 30 sekondave of not getting acknowledgement
  automatikisht ka me e marre ate event edhe me e dergu tek nje pjestar/member 
  i atije QUEUE, nese nuk ka asnje antar/member e kthen eventin prap tek service 
  i pare edhe lejoja edhe nje shot prap me procesu kete event.

  Pra, nese nuk e bojna acknowledge na vet manualisht eventin qe naj ka pru NATS
  Streaming, ateher NATS ka me prit aty edhe thot vetmeveti: 
  NATS: OK i sent the event but i haven't heard back yet! G, i sure hope
        everything is going OK xD, and is just sitting and waiting to get
        an acknowledgement for the event.
  
  FIX: per me "acknowledge" eventin ne fund te procesit e bojna "msg.ack()"
*/