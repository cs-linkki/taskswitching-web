package linkki.taskswitching;

import java.util.Enumeration;
import javax.servlet.http.HttpServletRequest;
import linkki.taskswitching.dto.AuthenticationInformation;
import linkki.taskswitching.dto.Participant;
import linkki.taskswitching.repository.AuthenticationInformationRepository;
import linkki.taskswitching.repository.ParticipantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class LoginController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private ParticipantRepository participantRepository;
    @Autowired
    private AuthenticationInformationRepository authenticationInformationRepository;

    @RequestMapping(value = "whoami", method = RequestMethod.GET)
    @ResponseBody
    public String username() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @RequestMapping(value = "auth/{username}", method = RequestMethod.GET)
    public String login(@PathVariable String username, HttpServletRequest request) {
        return auth(username, "salainen", request);
    }

    @RequestMapping(value = "login", method = RequestMethod.GET)
    public void login() {
    }

    @RequestMapping(value = "formauth", method = RequestMethod.POST)
    public String performFormAuth(
            @RequestParam("username") String username,
            @RequestParam(value = "password", defaultValue = "salainen") String password,
            HttpServletRequest request) {
        return auth(username, password, request);
    }

    private String auth(String username, String password, HttpServletRequest request) {
        System.out.println("Authenticating user: " + username);
        UsernamePasswordAuthenticationToken token =
                new UsernamePasswordAuthenticationToken(username, password);
        try {
            Authentication auth = authenticationManager.authenticate(token);
            if (!auth.isAuthenticated()) {
                throw new BadCredentialsException("No such user..");
            }

            storeLoginInformation(username, request);
            SecurityContextHolder.getContext().setAuthentication(auth);

            return "redirect:" + getPath(request) + "game.html";
        } catch (BadCredentialsException ex) {
        }

        return "redirect:" + getPath(request) + "index.html?error";
    }

    @RequestMapping(value = "login", method = RequestMethod.POST)
    @ResponseBody
    public String performLogin(
            @RequestParam("username") String username,
            @RequestParam(value = "password", defaultValue = "salainen") String password,
            HttpServletRequest request) {

        UsernamePasswordAuthenticationToken token =
                new UsernamePasswordAuthenticationToken(username, password);
        try {
            Authentication auth = authenticationManager.authenticate(token);
            if (!auth.isAuthenticated()) {
                throw new BadCredentialsException("No such user..");
            }

            storeLoginInformation(username, request);
            SecurityContextHolder.getContext().setAuthentication(auth);
            return "{\"status\": true}";
        } catch (BadCredentialsException ex) {
            return "{\"status\": false, \"error\": \"Bad Credentials\"}";
        }
    }

    private void storeLoginInformation(String username, HttpServletRequest request) {
        Participant p = participantRepository.findByUsername(username);
        if (p == null) {
            throw new IllegalArgumentException("Unable to find " + username + " although (s)he should be present.");
        }

        AuthenticationInformation info = new AuthenticationInformation(p, getDetails(request));
        authenticationInformationRepository.save(info);
    }

    private String getDetails(HttpServletRequest request) {
        StringBuilder sb = new StringBuilder();
        Enumeration headers = request.getHeaderNames();
        while (headers.hasMoreElements()) {
            Object objHeader = headers.nextElement();
            if (!(objHeader instanceof String)) {
                continue;
            }

            String header = (String) objHeader;
            String value = request.getHeader(header);
            sb.append(header.trim()).append("=").append(value).append("\n");
        }

        return sb.toString().trim();
    }

    private String getPath(HttpServletRequest req) {
        System.out.println("Retrieving path for " + req.getRequestURL());
        String ref = req.getHeader("referer");
        if(ref != null && ref.contains("/")) {
            ref = ref.substring(0, ref.lastIndexOf("/"));
        }
        
        if (ref == null || ref.trim().isEmpty()) {
            ref = req.getScheme()
                    + "://"
                    + req.getServerName()
                    + ":"
                    + req.getServerPort();
            if (!ref.endsWith("/")) {
                ref = ref + "/";
            }

            String ctxPath = req.getContextPath();
            if(ctxPath.startsWith("/")) {
                ctxPath = ctxPath.substring(1);
            }
            ref = ref + ctxPath;
        }

        if (!ref.endsWith("/")) {
            ref = ref + "/";
        }

        return ref;
    }
}