import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/file-item';

@Directive({
  selector: '[appDropFiles]'
})
export class DropFilesDirective {

  @Input() file?: FileItem;
  @Output() mouseOn: EventEmitter<boolean> = new EventEmitter();
  @Output() loadFile: EventEmitter<FileItem> = new EventEmitter();

  constructor() { } 

  @HostListener('dragover', ['$event'])
  public onDragEnter( event: any ) {
    this.mouseOn.emit( true );
    this._preventStop( event );
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave( event: any ) {
    this.mouseOn.emit( false );
  }

  @HostListener('drop', ['$event'])
  public onDrop( event: any ) {

    const tranference = this._getTransfer( event );

    if ( !tranference ) {
      return;
    }

    this._getFile(tranference.files);
    this._preventStop( event );
    this.mouseOn.emit( false );

  }

  private _getTransfer( event: any ) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _getFile( fileList: FileList ) {

      const tmpFile: File = fileList[0];

      if (tmpFile.type === '' || tmpFile === undefined) {
        return;
      }

      if(this._isCSVFile(tmpFile.type)) {
        this.file = new FileItem( tmpFile );
        this.loadFile.emit ( this.file );
      }
      
  }

  // Validations

  private _preventStop( event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  private _isCSVFile ( fileType: any): boolean {
    return fileType.endsWith('csv') ? true : false;
  }

}
