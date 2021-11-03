import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MeBasicAlertService } from '../components/me-basic-alert/me-basic-alert.service';
import {
  MeBasicAlertI,
  MODE,
} from '../components/me-basic-alert/me-basic-alert.interface';
import { ErrorResponseI } from '../interfaces/error-response.interface';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  // private readonly _loaderComponent = new BehaviorSubject<boolean>(false);
  // readonly isActivatedLoader$ = this._loaderComponent.asObservable();
  // readonly refreshDropzone = new Subject<void>();

  constructor(
    // private sweetAlertService: MeSweetAlertService,
    private basicAlertService: MeBasicAlertService,
    private translateService: TranslateService
  ) {}

  // get isActivatedLoader(): boolean {
  //   return this._loaderComponent.getValue();
  // }

  // activateLoader(): void {
  //   this._loaderComponent.next(true);
  // }

  // deactivateLoader(): void {
  //   this._loaderComponent.next(false);
  // }

  // -- BASIC ALERT: general usage
  showBasicAlert(mode: MODE, title: string, content: string): void {
    const basicAlertData: MeBasicAlertI = {
      mode,
      title,
      content,
    };

    this.basicAlertService.openBasicAlert(basicAlertData);
  }

  // BASIC ALERT: default error handling
  showBasicAlertDefaultError(error: ErrorResponseI): void {
    this.showBasicAlert(MODE.error, error.error.title, error.error.details);
  }

  // BASIC ALERT: vast usage empty file error
  showBasicAlertEmptyFile(): void {
    this.showBasicAlert(
      MODE.error,
      this.translateService.instant('emptyDocument'),
      this.translateService.instant('noFile')
    );
  }

  /*
  // -- SWEET ALERT: general usage of ALERT
  showAlert(title: string, message: string, okBtn?: string): void {
    this.sweetAlertService.openMeSweetAlert({
      title,
      message,
      mode: 'warning',
      type: {
        name: MeSweetAlertTypeEnum.alert,
        buttons: {
          ok: okBtn || this.translateService.instant('ok')
        }
      }
    });
  }

  // -- SWEET ALERT: generic alert
  showAlertDialog(model: MeSweetAlertI): Observable<MeSweetAlertI | undefined> {
    const alertId: string = model.id || uuidv4();
    model.id = alertId;
    this.sweetAlertService.openMeSweetAlert(model);
    return this.sweetAlertService.getDataBackFromSweetAlert().pipe(
      filter((data: MeSweetAlertI) => {
        return data.id === alertId;
      })
    );
  }

  // -- SWEET ALERT: general usage of CONFIRM
  showConfirmAlert(
    title: string,
    message: string,
    warning: boolean = false,
    cancelBtn?: string,
    confirmBtn?: string
  ): Observable<MeSweetAlertI | undefined> {
    return this.showAlertDialog({
      icon: warning ? 'alert-triangle' : 'alert-octagon',
      title,
      message,
      mode: warning ? 'warning' : 'danger',
      type: {
        name: MeSweetAlertTypeEnum.confirm,
        buttons: {
          cancel: cancelBtn || this.translateService.instant('cancel'),
          confirm: confirmBtn || this.translateService.instant('confirm')
        }
      }
    });
  }

  // -- SWEET ALERT: general usage of SUBMIT
  showSubmitAlert(
    title: string,
    message: string,
    warning: boolean = false,
    cancelBtn?: string,
    submitBtn?: string
  ): Observable<MeSweetAlertI | undefined> {
    return this.showAlertDialog({
      icon: warning ? 'alert-triangle' : 'alert-octagon',
      title,
      message,
      mode: warning ? 'warning' : 'danger',
      type: {
        name: MeSweetAlertTypeEnum.submit,
        buttons: {
          cancel: cancelBtn || this.translateService.instant('cancel'),
          submit: submitBtn || this.translateService.instant('delete')
        }
      }
    });
  }

  // -- SWEET ALERT: general usage of PROMPT
  showPromptAlert(
    title: string,
    message: string,
    userInput?: string,
    checkForError?: {
      errorCompareString?: string;
      errorMsg?: string;
    },
    cancelBtn?: string,
    saveBtn?: string
  ): Observable<MeSweetAlertI | undefined> {
    return this.showAlertDialog({
      title,
      message,
      userInput,
      mode: 'warning',
      type: {
        name: MeSweetAlertTypeEnum.prompt,
        error: {
          compareString: checkForError?.errorCompareString || '',
          msg: checkForError?.errorMsg || ''
        },
        buttons: {
          cancel: cancelBtn || this.translateService.instant('cancel'),
          submit: saveBtn || this.translateService.instant('save')
        }
      }
    });
  }
  */
}
