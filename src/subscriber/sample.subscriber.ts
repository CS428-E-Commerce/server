import {
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
  } from 'typeorm';

  // Entities
  import { SampleEntity } from '@Entites/index';


  
  @EventSubscriber()
  export class SampleSubcriber implements EntitySubscriberInterface<SampleEntity> {
    listenTo() {
      return SampleEntity;
    }
  
    afterInsert(event: InsertEvent<SampleEntity>) {
      console.log(event);
    }
  }
  