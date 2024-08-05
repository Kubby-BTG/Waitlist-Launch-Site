// import Swal, { SweetAlertOptions } from "sweetalert2";

// type IAlertOptions = string | { title: string; text?: string; disableDismiss?: boolean };

// class AlertModalServiceBase {
//   private isOpen = false;
//   private waitingAllert: Partial<SweetAlertOptions>[] = [];

//   getBrandDecoration(opt: Partial<SweetAlertOptions>) {
//     const options01: Partial<SweetAlertOptions> = {
//       ...opt,
//       // showCancelButton: true,
//       // buttonsStyling: false,
//       // icon: "warning",
//       // iconHtml: iconSvg,
//       customClass: {
//         popup:
//           "!relative !transform !overflow-hidden !rounded-lg !bg-white !text-left !shadow-xl !transition-all sm:!my-8 sm:!w-full sm:!max-w-lg !p-0 !grid-cols-none",
//         icon: "!m-0 !mx-auto !flex !h-12 !w-12 !flex-shrink-0 !items-center !justify-center !rounded-full !border-0 !bg-red-100 sm:!h-10 sm:!w-10 !mt-5 sm!mt-6 sm:!ml-6 !col-start-1 !col-end-3 sm:!col-end-2",
//         title:
//           "!p-0 !pt-3 !text-center sm:!text-left !text-base !font-semibold !leading-6 !text-gray-900 !pl-4 !pr-4 sm:!pr-6 sm:!pl-0 sm:!pt-6 sm:!ml-4 !col-start-1 sm:!col-start-2 !col-end-3",
//         htmlContainer:
//           "!mt-2 sm:!mt-0 !m-0 !text-center sm:!text-left !text-sm !text-gray-500 !pl-4 sm:!pl-0 !pr-4 !pb-4 sm:!pr-6 sm:!pb-4 sm:!ml-4 !col-start-1 sm:!col-start-2 !col-end-3",
//         actions:
//           "!bg-gray-50 !px-4 !py-3 sm:!flex sm:!flex-row-reverse sm:!px-6 !w-full !justify-start !mt-0 !col-start-1 !col-end-3",
//         confirmButton:
//           "inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto",
//         cancelButton:
//           "mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto",
//       },
//       // title: "Deactivate account",
//       // text: "Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.",
//       // confirmButtonText: "Deactivate",
//       // cancelButtonText: "Cancel",
//     };

//     return options01;
//   }

//   private async runAlertBase(opt: Partial<SweetAlertOptions>) {
//     try {
//       this.isOpen = true;
//       await Swal.fire(opt as SweetAlertOptions);
//       await this.waitUntillSeconds(0.6);
//       this.isOpen = false;
//       this.runAwaiting();
//     } catch (err) {
//       this.isOpen = false;
//       await this.waitUntillSeconds(0.6);
//       this.runAwaiting();
//     }
//   }

//   private waitUntillSeconds(waitInSeconds: number) {
//     let wait = Math.round(waitInSeconds * 1000);
//     wait = wait > 100 ? wait : 100;
//     return new Promise<void>((resolve) => {
//       setTimeout(() => {
//         resolve();
//       }, wait);
//     });
//   }

//   private alertBase(opt: Partial<SweetAlertOptions>) {
//     if (this.isOpen) {
//       this.waitingAllert.push(opt);
//       return;
//     }
//     this.runAlertBase(opt).catch((e) => console.log(e));
//   }

//   private getOptions({ opt, icon }: { opt: IAlertOptions; icon: "warning" | "error" | "info" | "success" }) {
//     if (typeof opt !== "string") {
//       const { title, text, disableDismiss } = opt;
//       const option01: Partial<SweetAlertOptions> = {
//         title,
//         text,
//         icon: icon,
//         allowOutsideClick: disableDismiss === true,
//       };
//       return option01;
//     }
//     const option01: Partial<SweetAlertOptions> = {
//       title: opt,
//       icon: icon,
//       allowOutsideClick: false,
//     };
//     return option01;
//   }

//   warning(opt: IAlertOptions) {
//     this.alertBase(this.getOptions({ opt, icon: "warning" }));
//   }

//   error(opt: IAlertOptions) {
//     this.alertBase(this.getOptions({ opt, icon: "error" }));
//   }

//   info(opt: IAlertOptions) {
//     this.alertBase(this.getOptions({ opt, icon: "info" }));
//   }

//   success(opt: IAlertOptions) {
//     this.alertBase(this.getOptions({ opt, icon: "success" }));
//   }

//   alertContent({
//     title,
//     contentHtml,
//     disableDismiss,
//   }: {
//     title: string;
//     contentHtml: string | HTMLDivElement;
//     disableDismiss?: boolean;
//   }) {
//     const node = this.parseHtmlStringToNode(contentHtml);
//     const option01: Partial<SweetAlertOptions> = {
//       title,
//       html: node,
//       icon: "warning",
//       allowOutsideClick: disableDismiss === true,
//     };
//     this.alertBase(option01);
//   }

//   private runAwaiting() {
//     setTimeout(() => {
//       if (this.waitingAllert && this.waitingAllert.length) {
//         const opt = this.waitingAllert.splice(0, 1);
//         this.runAlertBase(opt[0]).catch((e) => console.log(e));
//       }
//     }, 400);
//   }

//   private parseHtmlStringToNode(htmlDiveOrString: string | HTMLDivElement): HTMLDivElement {
//     if (typeof htmlDiveOrString === "string") {
//       const wrapper = document.createElement("div");
//       wrapper.innerHTML = htmlDiveOrString;
//       return wrapper;
//     }
//     return htmlDiveOrString;
//   }
// }

// export const AlertModalService = new AlertModalServiceBase();
