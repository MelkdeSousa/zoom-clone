class Business {
  constructor({ room, media, view, socketBuilder }) {
    this.room = room
    this.media = media
    this.view = view
    this.socketBuilder = socketBuilder

    this.socketBuilder.emit('join-room', this.room, 'u1')

    this.currentStream = {}
    this.socket = {}
  }

  static initialize(deps) {
    const instance = new Business(deps)
    return instance._init()
  }

  async _init() {
    this.currentStream = await this.media.getCamera()

    this.socket = this.socketBuilder
      .setOnUserConnected(this.onUserConnected())
      .setOnUserDisconnected(this.onUserDisconnected())
      .build()

    this.addVideoStream('Melk de Sousa')
  }

  addVideoStream(userId, stream = this.currentStream) {
    const isCurrentId = false
    this.view.renderVideo({
      userId,
      stream,
      isCurrentId,
    })
  }

  onUserConnected = function () {
    return userId => {
      console.log('user connected!', userId)
    }
  }

  onUserDisconnected = function () {
    return userId => {
      console.log('user disconnected!', userId)
    }
  }
}
