class AlertService {
  private component: any = null;

  register(comp: any) {
    this.component = comp;
  }

  show(options: { type?: 'success' | 'error' | 'info'; message: string }) {
    if (!this.component) {
      console.warn('AlertModal not registered!');
      return;
    }
    this.component.show(options);
  }
}

export const alertService = new AlertService();

// global function you can call anywhere
export function alert(options: { type?: 'success' | 'error' | 'info'; message: string }) {
  alertService.show(options);
}
