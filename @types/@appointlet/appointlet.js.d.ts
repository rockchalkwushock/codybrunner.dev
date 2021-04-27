declare module '@appointlet/appointlet.js' {
  declare class Appointlet {
    constructor(link: string)
    inlineEmbed: (el: Element) => Promise<SchedulerAttendeeNode | null>
    openModal: () => Promise<SchedulerAttendeeNode | null>
  }
  export = Appointlet
}
