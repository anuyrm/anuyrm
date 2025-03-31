package uk.gov.dwp.uc.pairtest;

import thirdparty.paymentgateway.TicketPaymentService;
import thirdparty.seatbooking.SeatReservationService;
import uk.gov.dwp.uc.pairtest.domain.TicketTypeRequest;
import uk.gov.dwp.uc.pairtest.exception.InvalidPurchaseException;

import java.util.EnumMap;
import java.util.Map;

public class TicketServiceImpl implements TicketService {
    /**
     * Should only have private methods other than the one below.
     */
    private final TicketPaymentService paymentService;
    private final SeatReservationService reservationService;
    private static final int MAX_TICKETS = 25;

    public TicketServiceImpl(TicketPaymentService paymentService, SeatReservationService reservationService) {
        this.paymentService = paymentService;
        this.reservationService = reservationService;
    }

    @Override
    public void purchaseTickets(Long accountId, TicketTypeRequest... ticketTypeRequests) throws InvalidPurchaseException {
        if (accountId == null || accountId <= 0) {
            throw new InvalidPurchaseException("Invalid account ID.");
        }

        if (ticketTypeRequests == null || ticketTypeRequests.length == 0) {
            throw new InvalidPurchaseException("At least one ticket must be requested.");
        }

        Map<TicketTypeRequest.Type, Integer> ticketCounts = new EnumMap<>(TicketTypeRequest.Type.class);
        int totalTickets = 0;
        int totalAmount = 0;
        int seatsToReserve = 0;

        for (TicketTypeRequest request : ticketTypeRequests) {
            TicketTypeRequest.Type type = request.getTicketType();
            int quantity = request.getNoOfTickets();
            ticketCounts.merge(type, quantity, Integer::sum);
            totalTickets += quantity;

            if (type != TicketTypeRequest.Type.INFANT) {
                totalAmount += quantity * type.getPrice();
                seatsToReserve += quantity;
            }
        }

        if (totalTickets > MAX_TICKETS) {
            throw new InvalidPurchaseException("Cannot purchase more than 25 tickets.");
        }

        int adultCount = ticketCounts.getOrDefault(TicketTypeRequest.Type.ADULT, 0);
        int infantCount = ticketCounts.getOrDefault(TicketTypeRequest.Type.INFANT, 0);
        int childCount = ticketCounts.getOrDefault(TicketTypeRequest.Type.CHILD, 0);

        if (adultCount == 0 && (infantCount > 0 || childCount > 0)) {
            throw new InvalidPurchaseException("At least one adult ticket must be purchased with child or infant tickets.");
        }

        if (infantCount > adultCount) {
            throw new InvalidPurchaseException("Each infant must be accompanied by one adult.");
        }

        paymentService.makePayment(accountId, totalAmount);
        reservationService.reserveSeat(accountId, seatsToReserve);
    }

}
