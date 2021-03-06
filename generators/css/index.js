'use strict';
var yeoman = require('yeoman-generator'),
    _ = require('lodash'),
    fs = require('fs'),
    os = require('os'),
    path = require('path'),
    log = require('fancy-log'),
    colors = require('ansi-colors');

module.exports = yeoman.Base.extend({

    constructor: function () {
        yeoman.Base.apply(this, arguments);

        // fileName 为需要创建的 Css 文件名
        this.argument('fileName', {
            type: String,
            desc: 'Style file name',
            required: true
        });
    },

    writing: function () {

        // 检查时间格式（自动补0）
        var checkDateFormat = function (date) {
            var result = date;
            if (result < 10) {
                result = '0' + result;
            }

            return result;
        };

        // 获取当前时间
        var currentDate = new Date(),
            currentYear = currentDate.getFullYear(),
            currentMonth = checkDateFormat(currentDate.getMonth() + 1),
            currentDay = checkDateFormat(currentDate.getDate()),
            formattingDate = currentYear + '-' + currentMonth + '-' + currentDay;

        // 生成 Css 文件
        var readmeHeaderTmpl = _.template(this.fs.read(this.templatePath('template.css')));
        fs.writeFileSync(this.destinationPath(this.fileName + '.css'), readmeHeaderTmpl({
            fileName: this.fileName,
            author: _.upperFirst(path.basename(os.homedir())),
            createDate: formattingDate
        }));

        log(colors.green('QMUI Generator: ') + '创建新 Style 文件 ' + this.fileName + '.css');

        process.exit(0);
    }

});
