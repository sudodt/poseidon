"use strict";
exports.__esModule = true;
var react_1 = require("react");
var card_1 = require("primereact/card");
var react_hook_form_1 = require("react-hook-form");
var Detail_module_scss_1 = require("./Detail.module.scss");
var fileupload_1 = require("primereact/fileupload");
var button_1 = require("primereact/button");
var tag_1 = require("primereact/tag");
var Upload = function (props) {
    var _a = react_hook_form_1.useFormContext(), control = _a.control, errors = _a.formState.errors, handleSubmit = _a.handleSubmit, reset = _a.reset, setValue = _a.setValue, watch = _a.watch;
    var fileUploadRef = react_1.useRef(null);
    var onTemplateSelect = function (e) {
        setValue('images', fileUploadRef.current.files);
    };
    var onTemplateRemove = function (file, callback) {
        var removedItemIndex = fileUploadRef.current.files.findIndex(function (res) { return res.name === file.name; });
        callback();
        fileUploadRef.current.files.splice(removedItemIndex, 1);
        setValue('images', fileUploadRef.current.files);
    };
    var headerTemplate = function (options) {
        var className = options.className, chooseButton = options.chooseButton, cancelButton = options.cancelButton;
        return (<div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
                {cancelButton}
            </div>);
    };
    var itemTemplate = function (file, props) {
        return (<div className="p-d-flex p-ai-center p-flex-wrap">
                <div className="p-d-flex p-ai-center" style={{ width: '40%' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img alt={file.name} role="presentation" src={file.objectURL} width={100}/>
                    <span className="p-d-flex p-dir-col p-text-left p-ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <tag_1.Tag value={props.formatSize} severity="warning" className="p-px-3 p-py-2"/>
                <button_1.Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger p-ml-auto" onClick={function () { return onTemplateRemove(file, props.onRemove); }}/>
            </div>);
    };
    var emptyTemplate = function () {
        return (<div className="p-d-flex p-ai-center p-dir-col">
                <i className="pi pi-image p-mt-3 p-p-5" style={{ 'fontSize': '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span style={{ 'fontSize': '1.2em', color: 'var(--text-color-secondary)' }} className="p-my-5">
                    Drag and Drop Image Here
                </span>
            </div>);
    };
    var chooseOptions = {
        icon: 'pi pi-fw pi-cloud-upload',
        label: 'Thêm ảnh',
        className: 'custom-choose-btn p-button-rounded p-button-outlined'
    };
    var cancelOptions = {
        icon: 'pi pi-fw pi-times',
        label: 'Làm mới',
        className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined'
    };
    return (<div className={Detail_module_scss_1["default"].wrapper + " container"}>
            <card_1.Card>
                <h3>3. Tải lên</h3>
                <div className={"p-grid"}>
                    <div className="p-col-12">
                        <fileupload_1.FileUpload ref={fileUploadRef} name="images[]" multiple accept="image/*" maxFileSize={1000000} onSelect={onTemplateSelect} headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate} chooseOptions={chooseOptions} cancelOptions={cancelOptions}/>
                    </div>

                </div>
            </card_1.Card>
        </div>);
};
exports["default"] = Upload;
