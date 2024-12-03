package com.studentmanagement.controller;

import com.studentmanagement.model.Industry;
import com.studentmanagement.service.IndustryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/industries")
public class IndustryController {

    private final IndustryService industryService;

    @Autowired
    public IndustryController(IndustryService industryService) {
        this.industryService = industryService;
    }

    // Endpoint lọc ngành theo tiêu chí
    @GetMapping("/find")
    public ResponseEntity<?> filterIndustries(
            @RequestParam String filter,
            @RequestParam String query) {

        // Kiểm tra tham số filter và query có rỗng không
        if (filter == null || filter.isEmpty() || query == null || query.isEmpty()) {
            return ResponseEntity.badRequest().body("Filter and query parameters are required.");
        }

        // Xử lý và tìm các ngành theo tiêu chí
        try {
            List<Industry> industries = industryService.filterIndustries(filter, query);

            // Nếu không tìm thấy kết quả, trả về 204 No Content
            if (industries.isEmpty()) {
                return ResponseEntity.noContent().build();
            }

            // Trả về danh sách các ngành tìm được
            return ResponseEntity.ok(industries);
        } catch (IllegalArgumentException e) {
            // Nếu filter không hợp lệ, trả về lỗi 400 Bad Request
            return ResponseEntity.badRequest().body("Invalid filter criteria: " + filter);
        } catch (Exception e) {
            // Nếu có lỗi khác, trả về lỗi 500 Internal Server Error
            return ResponseEntity.status(500).body("An error occurred while processing the request.");
        }
    }
}
