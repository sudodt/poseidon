"use strict";
// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
var EmailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const models_1 = require("../models");
const nodemailer_1 = require("nodemailer");
let EmailService = EmailService_1 = class EmailService {
    /**
     * If using gmail see https://nodemailer.com/usage/using-gmail/
     */
    static async setupTransporter() {
        return (0, nodemailer_1.createTransport)({
            host: process.env.SMTP_SERVER,
            port: +process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD,
            },
        });
    }
    async sendResetPasswordMail(user) {
        const transporter = await EmailService_1.setupTransporter();
        const emailTemplate = new models_1.EmailTemplate({
            to: user.email,
            subject: '[Shoppy] Reset Password Request',
            html: `
      <div>
          <p>Hello, ${user.firstName} ${user.lastName}</p>
          <p style="color: red;">We received a request to reset the password for your account with email address: ${user.email}</p>
          <p>To reset your password click on the link provided below</p>
          <a href="${process.env.APPLICATION_URL}/reset-password-finish.html?resetKey=${user.resetKey}">Reset your password link</a>
          <p>If you didn’t request to reset your password, please ignore this email or reset your password to protect your account.</p>
          <p>Thanks</p>
          <p>LoopBack'ers at Shoppy</p>
      </div>
      `,
        });
        return transporter.sendMail(emailTemplate);
    }
};
EmailService = EmailService_1 = tslib_1.__decorate([
    (0, core_1.bind)({ scope: core_1.BindingScope.TRANSIENT })
], EmailService);
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map