interface MockResponse {
    code: number,
    data: any,
    message: string
}

export default function (type: string, payload: any, timeout: number = 500): Promise<MockResponse> {
    return new Promise(resolve => {
        const response: MockResponse = {
            code: 0,
            data: '',
            message: 'success'
        }

        switch (type) {
            case 'getUsername':
                response.data = 'Arman'
                break
            case 'getAge':
                response.data = '18'
                break
        }

        setTimeout(() => {
            resolve(response)
        }, timeout)
    })
}
