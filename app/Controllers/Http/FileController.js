'use strict';

const File = use('App/Models/File')
const Helpers = use('Helpers')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with files
 */
class FileController {
  async show ({ params, response }) {
    const file = await File.findOrFail(params.id)

    return response.download(Helpers.tmpPath(`uploads/${file.file}`))
  }

  /**
   * Create/save a new file.
   * POST files
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    if (!request.file('file')) return

    const upload = request.file('file', { size: '5mb' })

    const fileName = `${Date.now()}.${upload.subtype}`

    await upload.move(Helpers.tmpPath('uploads'), {
      name: fileName
    })

    if (!upload.moved()) {
      throw upload.error()
    }

    const file = await File.create({
      file: fileName,
      name: upload.clientName,
      type: upload.type,
      subtype: upload.subtype
    })

    return file
  }
}

module.exports = FileController
