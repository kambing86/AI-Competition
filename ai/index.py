from http.server import SimpleHTTPRequestHandler, BaseHTTPRequestHandler, HTTPServer
import introAI
import basicLearn
import subscribeRedis

# tf.logging.set_verbosity(tf.logging.INFO)

PORT = 3003
introAI.run()
basicLearn.run()
subscribeRedis.run()


class testHTTPServer_RequestHandler(BaseHTTPRequestHandler):
    # GET
    def do_GET(self):
        # Send response status code
        self.send_response(200)

        # Send headers
        self.send_header("Content-type", "text/html")
        self.end_headers()

        # Send message back to client
        message = "Hello world!"
        # Write content as utf-8 data
        self.wfile.write(bytes(message, "utf8"))
        return


def run():
    print("starting server...")
    httpd = HTTPServer(("", PORT), testHTTPServer_RequestHandler)
    print("serving at port", PORT)
    httpd.serve_forever()


run()
