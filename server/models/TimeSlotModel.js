class TimeSlot {
    constructor({ id, dentist_id, slot_time, appointment_date, created_at, status }) {
      this.id = id;
      this.dentist_id = dentist_id;
      this.slot_time = slot_time;
      this.appointment_date = appointment_date;
      this.created_at = created_at;
      this.status = status;
    }
  }
  
  module.exports = TimeSlot;
  