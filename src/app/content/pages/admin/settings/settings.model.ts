
export class Settings {
    id: number = 0;
    name: string = ''
    display_name: string = ''
    value: string = ''
    published: boolean = true;
    serial: number = 0;
    settinggroup: string = ''
}
export class SettingsGroup {
    firm_name: string = ''
    firm_slogan: string = ''
    emergency_no: string = ''
    phone_no_one: string = ''
    phone_no_two: string = ''
    phone_no_three: string = ''
    phone_no_four: string = ''
    book_appointment_link: string = ''
    patient_report_link: string = ''
    facebook_link: string = ''
    instagram_link: string = ''
    tiktok_link: string = ''
    linkedin_link: string = ''
    youtube_link: string = ''
    po_box: string = ''
    address_one: string = ''
    address_two: string = ''
    customer_support_email: string = ''
    email_one: string = ''
    email_two: string = ''
    map_url: string = ''; 
    remarks: string = ''
}

export class UserUploads {
    ddate: string = '';
    extension: string = '';
    filenames: string = '';
    id: number = 0;
    published: boolean = false;
    sn: string = '';
    userid: number = 0;
  }
