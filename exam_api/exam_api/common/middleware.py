import threading


class CorsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        response['Access-Control-Allow-Origin'] = '*'
        return response

_threadmap = threading.local()

def get_current_request():
    return getattr(_threadmap,"request",None)


class RequestMiddleware(object):
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        _threadmap.request = request
        return self.get_response(request)

    def process_request(self, request):
        pass

    def process_exception(self, request, exception):
        try:
            del _threadmap[threading.get_ident()]
        except KeyError:
            pass

    def process_response(self, request, response):
        try:
            del _threadmap[threading.get_ident()]
        except KeyError:
            pass
        return response
